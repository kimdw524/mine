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
  const stateRef = useRef<number>(0);

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
    if (e.target !== wrapperRef.current) {
      return;
    }

    if (data.show && stateRef.current === 0) {
      stateRef.current = 1;
      return;
    }

    if (!data?.show && stateRef.current !== 2) {
      stateRef.current = 2;
      onFadeOutEnd();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    if (e.target !== wrapperRef.current || stateRef.current !== 1) {
      return;
    }

    window.history.back();
  };

  return (
    <div
      ref={wrapperRef}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{data?.component}</div>
    </div>
  );
};

export default Modal;
