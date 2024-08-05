import React, { useEffect, useRef } from 'react';
import { ModalData } from '.';
import styles from './Modal.module.css';

interface ModalProps extends React.ComponentProps<'div'> {
  data: ModalData;
  onFadeOutEnd: () => void;
}

const classNames = {
  modal: {
    enter: styles.enter,
    exit: styles.exit,
  },
  alert: {
    enter: styles['alert-enter'],
    exit: styles['alert-exit'],
  },
};

const Modal = ({ data, onFadeOutEnd }: ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (data?.show === true) {
      wrapperRef.current.className = classNames[data.type].enter;
      return;
    }
    wrapperRef.current.className = classNames[data.type].exit;
  }, [data?.show, wrapperRef]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!data?.show && e.propertyName === 'opacity') {
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
