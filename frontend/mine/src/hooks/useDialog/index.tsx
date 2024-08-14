import React, { ReactNode, useContext } from 'react';
import { ModalContext } from '../useModal';
import Alert from './Alert';
import Confirm from './Confirm';

const useDialog = () => {
  const modalContext = useContext(ModalContext);

  const alert = (message: ReactNode) => {
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

  const confirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const handleYesClick = () => {
        resolve(true);
        window.history.back();
      };

      modalContext.push({
        component: (
          <Confirm onYesClick={handleYesClick}>
            {message.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Confirm>
        ),
        name: 'confirm',
        type: 'confirm',
        show: true,
        onClose: () => {
          resolve(false);
        },
      });
    });
  };

  return { alert, confirm };
};

export default useDialog;
