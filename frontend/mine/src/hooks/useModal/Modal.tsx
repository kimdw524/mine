import React, { useEffect, useRef, useState } from 'react';
import { ModalData } from '.';
import styles from './Modal.module.css';

interface ModalProps extends React.ComponentProps<'div'> {
  data: ModalData | null;
}

const classNames = {
  modal: styles.modal,
  unmounted: styles.unmounted,
  enter: styles.enter,
  exit: styles.exit,
};

const Modal = ({ data }: ModalProps) => {
  const [modal, setModal] = useState<ModalData | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModal(data);

    if (wrapperRef.current) {
      if (data === null) {
        wrapperRef.current.className = classNames.modal;
      } else if (data.show) {
        wrapperRef.current.className = `${classNames.enter}`;
      } else {
        wrapperRef.current.className = classNames.unmounted;
        const reflow = wrapperRef.current.offsetTop;
        wrapperRef.current.className = `${classNames.unmounted} ${classNames.exit}`;
      }
    }
  }, [data]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (
      wrapperRef.current?.classList.contains(classNames.exit) &&
      e.propertyName === 'opacity'
    ) {
      setModal(null);
    }
  };

  return (
    <>
      <div ref={wrapperRef} onTransitionEnd={handleTransitionEnd}>
        {modal?.component}
      </div>
    </>
  );
};

export default Modal;
