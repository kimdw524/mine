/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { containerCss, slideCss, itemCss, lightCss } from './style';

interface SlideInputProps {
  min: number;
  max: number;
  value: number;
}

const ITEM_HEIHGT = 64;

const getAdjacentValue = (
  min: number,
  max: number,
  value: number,
  length: number,
) => {
  const result: number[] = [];

  for (let i = value - (length - 1) / 2; i <= value + (length - 1) / 2; i++) {
    if (i < min) {
      result.push(max + i - min + 1);
      continue;
    }

    if (i > max) {
      result.push(min + i - max - 1);
      continue;
    }

    result.push(i);
  }

  return result;
};

const SlideInput = ({ min, max, value }: SlideInputProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>(value);

  useEffect(() => {
    const slide = slideRef.current;
    if (!slide) {
      return;
    }

    let touchY = 0,
      updated = 0,
      slideY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      updated = e.timeStamp;
      slide.style.transition = '';
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const diffY = touchY - e.touches[0].clientY,
        interval = e.timeStamp - updated;

      slideY -= diffY;

      console.log(diffY);

      if (slideY >= ITEM_HEIHGT) {
        setSelected((selected) => {
          slideY %= ITEM_HEIHGT;
          slide.style.setProperty('--y', `${slideY}px`);
          return selected === min ? max : selected - 1;
        });
      } else if (slideY <= -ITEM_HEIHGT) {
        setSelected((selected) => {
          slideY %= ITEM_HEIHGT;
          slide.style.setProperty('--y', `${slideY}px`);
          return selected === max ? min : selected + 1;
        });
      }
      slide.style.setProperty('--y', `${slideY}px`);
      touchY = e.touches[0].clientY;
      updated = e.timeStamp;
    };

    const handleTouchEnd = () => {
      slideY = Math.round(slideY / ITEM_HEIHGT) * ITEM_HEIHGT;
      slide.style.transition = 'transform 0.2s ease';
      slide.style.setProperty('--y', `${slideY}px`);
    };

    slide.addEventListener('touchstart', handleTouchStart);
    slide.addEventListener('touchmove', handleTouchMove);
    slide.addEventListener('touchend', handleTouchEnd);

    return () => {
      slide.removeEventListener('touchstart', handleTouchStart);
      slide.removeEventListener('touchmove', handleTouchMove);
      slide.removeEventListener('touchend', handleTouchEnd);
    };
  }, [slideRef, setSelected]);

  return (
    <div css={containerCss}>
      <div css={slideCss} ref={slideRef}>
        {getAdjacentValue(min, max, selected, 5).map((value, index) => (
          <div key={index} css={itemCss}>
            {value}
          </div>
        ))}
      </div>
      <div css={lightCss} style={{ top: 0 }}></div>
      <div css={lightCss} style={{ bottom: 0 }}></div>
    </div>
  );
};

export default SlideInput;
