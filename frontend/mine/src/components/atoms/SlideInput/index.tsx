/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { containerCss, slideCss, itemCss } from './style';

interface SlideInputProps {
  min: number;
  max: number;
  value: number;
}

const ITEM_HEIHGT = 64;

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
    };

    const handleTouchMove = (e: TouchEvent) => {
      const diffY = touchY - e.touches[0].clientY,
        interval = e.timeStamp - updated;
      slideY -= diffY;
      if (slideY >= ITEM_HEIHGT) {
        setSelected((selected) => (selected === min ? max : selected - 1));
        slideY = 0;
      } else if (slideY <= -ITEM_HEIHGT) {
        setSelected((selected) => (selected === max ? min : selected + 1));
        slideY = 0;
      }
      slide.style.setProperty('--y', `${slideY}px`);
      touchY = e.touches[0].clientY;
      updated = e.timeStamp;
    };

    const handleTranstionEnd = () => {};

    slide.addEventListener('touchstart', handleTouchStart);
    slide.addEventListener('touchmove', handleTouchMove);
    slide.addEventListener('transitionend', handleTranstionEnd);

    return () => {
      slide.removeEventListener('touchstart', handleTouchStart);
      slide.removeEventListener('touchmove', handleTouchMove);
      slide.removeEventListener('transitionend', handleTranstionEnd);
    };
  }, [slideRef, setSelected]);

  return (
    <div css={containerCss}>
      <div css={slideCss} ref={slideRef}>
        {new Array(5).fill(0).map((item, index) => (
          <div key={index} css={itemCss}>
            {selected + index - 2}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideInput;
