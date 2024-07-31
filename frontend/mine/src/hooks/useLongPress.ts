import { useEffect, useRef } from 'react';

/** element를 꾸욱 누르면 애니메이션과 이벤트를 발생시키는 hook */
const useLongPress = <T extends HTMLElement>(
  onLongPress: () => void,
  duration: number = 800,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    let timer: NodeJS.Timer;

    const handleMouseDown = () => {
      timer = setTimeout(() => {
        onLongPress();
        handleMouseUp();
      }, duration);
    };

    const handleMouseUp = () => {
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
  }, [ref, onLongPress, duration]);

  return { ref };
};

export default useLongPress;
