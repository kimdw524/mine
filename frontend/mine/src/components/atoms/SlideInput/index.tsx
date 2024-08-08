/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { containerCss, slideCss, itemCss, lightCss } from './style';

interface SlideInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
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

const SlideInput = ({ min, max, value, onChange }: SlideInputProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>(value);
  const [number, setNumber] = useState<string>(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      setNumber('0');
      return;
    }

    if (e.target.value[0] === '0') {
      setNumber(parseInt(e.target.value.substring(1)).toString());
      return;
    }
    setNumber(e.target.value.substring(0, 2));
  };

  const handleBlur = () => {
    setSelected(Math.min(max, Math.max(min, parseInt(number) || 0)));
  };

  useEffect(() => {
    const slide = slideRef.current;
    if (!slide) {
      return;
    }

    let touchY = 0,
      touch = false,
      slideY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touch = true;
      slide.style.transition = '';
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const diffY = Math.min(100, touchY - e.touches[0].clientY);

      slideY -= Math.round(
        Math.abs(diffY) > 10
          ? diffY * (1 + (3 / 90) * (Math.abs(diffY) - 10))
          : diffY,
      );

      const change = Math.floor(Math.abs(slideY / ITEM_HEIHGT));

      if (slideY >= ITEM_HEIHGT) {
        setSelected((selected) => {
          slideY %= ITEM_HEIHGT;
          slide.style.setProperty('--y', `${slideY}px`);
          if (!touch) {
            handleTouchEnd();
          }
          const value =
            selected - change < min ? max - change + 1 : selected - change;

          setNumber(value.toString());
          return value;
        });
      } else if (slideY <= -ITEM_HEIHGT) {
        setSelected((selected) => {
          slideY %= ITEM_HEIHGT;
          slide.style.setProperty('--y', `${slideY}px`);
          if (!touch) {
            handleTouchEnd();
          }
          const value =
            selected + change > max ? min + change - 1 : selected + change;

          setNumber(value.toString());
          return value;
        });
      }
      slide.style.setProperty('--y', `${slideY}px`);
      touchY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      touch = false;
      slide.style.transition = 'transform 0.2s ease';
      slide.style.setProperty('--y', '0');
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

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div css={containerCss}>
      <div css={slideCss} ref={slideRef}>
        {getAdjacentValue(min, max, selected, 5).map((value, index) =>
          value === selected ? (
            <input
              type="number"
              key={index}
              css={itemCss}
              value={number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <div key={index} css={itemCss}>
              {value}
            </div>
          ),
        )}
      </div>
      <div css={lightCss} style={{ top: 0 }}></div>
      <div css={lightCss} style={{ bottom: 0 }}></div>
    </div>
  );
};

export default SlideInput;
