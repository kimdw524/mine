import React, { useEffect, useRef } from 'react';
import { ModalData } from '.';
import styles from './Modal.module.css';

interface ModalProps extends React.ComponentProps<'div'> {
  data: ModalData;
  onFadeOutEnd: () => void;
}

const classNames = {
  modal: {
    base: styles.base,
    enter: styles.enter,
    exit: styles.exit,
  },
  alert: {
    base: styles['alert-base'],
    enter: styles['alert-enter'],
    exit: styles['alert-exit'],
  },
  confirm: {
    base: styles['alert-base'],
    enter: styles['alert-enter'],
    exit: styles['alert-exit'],
  },
};

const Modal = ({ data, onFadeOutEnd }: ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<boolean>(false);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (data?.show === true) {
      wrapperRef.current.className = classNames[data.type].base;
      const reflow = wrapperRef.current.offsetTop;
      wrapperRef.current.classList.add(classNames[data.type].enter);
      return;
    }
    wrapperRef.current.className = `${classNames[data.type].base} ${classNames[data.type].exit}`;
  }, [data?.show, wrapperRef]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!data?.show && !endRef.current) {
      endRef.current = true;
      onFadeOutEnd();
    }
  };

  return (
    <>
      <div ref={wrapperRef} onTransitionEnd={handleTransitionEnd}>
        {data?.component}
      </div>
    </>
  );
};

export default Modal;
