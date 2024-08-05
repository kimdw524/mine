import React, { useContext } from 'react';
import { ModalContext } from '../useModal';
import Alert from './Alert';

const useDialog = () => {
  const modalContext = useContext(ModalContext);

  const alert = (message: string) => {
    return new Promise((resolve) => {
      modalContext.push({
        component: <Alert>{message}</Alert>,
        name: 'alert',
        type: 'alert',
        show: true,
        onClose: () => {
          resolve('');
        },
      });
    });
  };

  return { alert };
};

export default useDialog;
