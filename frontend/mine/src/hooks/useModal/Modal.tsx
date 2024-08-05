import React, { useEffect, useRef } from 'react';
import { ModalData } from '.';
import styles from './Modal.module.css';

interface ModalProps extends React.ComponentProps<'div'> {
  data: ModalData | null;
  onFadeOutEnd: () => void;
}

const classNames = {
  modal: styles.modal,
  unmounted: styles.unmounted,
  enter: styles.enter,
  exit: styles.exit,
};

const Modal = ({ data, onFadeOutEnd }: ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    if (data?.show === true) {
      wrapperRef.current.className = classNames.enter;
      return;
    }
    wrapperRef.current.className = classNames.exit;
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
