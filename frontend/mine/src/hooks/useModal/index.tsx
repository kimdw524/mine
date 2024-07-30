import React, { ReactNode, useState } from 'react';
import Modal from './Modal';

const useModal = () => {
  const [modal, setModal] = useState<ReactNode>(null);

  const close = () => {
    setModal(null);
  };

  const open = (component: ReactNode) => {
    setModal(component);
  };

  return { close, open, Modal, modal };
};

export default useModal;
