/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

const rippleCss = css`
  @keyframes ripple {
    from {
      background-color: transparent;
    }

    to {
      background-color: #aaa;
    }
  }
  position: absolute;
  inset: 0 0 0 0;
  z-index: -1;
  animation: ripple var(--duration) ease 1;
`;

const Ripple = ({ duration }: { duration: number }) => {
  return (
    <div
      css={rippleCss}
      style={{ '--duration': `${duration}ms` } as CSSProperties}
    ></div>
  );
};

/** element를 꾸욱 누르면 이벤트를 발생시키는 hook */
const useLongPress = <T extends HTMLElement>(
  onLongPress: () => void,
  animation: boolean = true,
  duration: number = 800,
) => {
  const ref = useRef<T>(null);
  const [ripple, setRipple] = useState<ReactElement>(<></>);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    let timer: NodeJS.Timer;

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.button !== 0) return;

      if (animation) {
        const { x, y } = current.getBoundingClientRect();

        console.log(x, y);
        console.log(e);

        setRipple(<Ripple duration={duration} />);
      }

      timer = setTimeout(() => {
        onLongPress();
        handleMouseUp();
      }, duration);
    };

    const handleMouseUp = () => {
      if (animation) {
        setRipple(<></>);
      }
      clearTimeout(timer);
    };

    current.addEventListener('touchstart', handleMouseDown);
    current.addEventListener('touchend', handleMouseUp);
    current.addEventListener('mousedown', handleMouseDown);
    current.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (!current) return;

      clearTimeout(timer);
      current.removeEventListener('touchstart', handleMouseDown);
      current.removeEventListener('touchend', handleMouseUp);
      current.removeEventListener('mousedown', handleMouseDown);
      current.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref, animation, onLongPress, duration]);

  return { ref, ripple };
};

export default useLongPress;
