import { ReactElement, useEffect, useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

export interface ModalData {
  name: string;
  component: ReactElement;
  show?: boolean;
}

const useModal = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalData | null>(null);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!modal) return;

      if (e.state.modal === modal.name) {
        navigate(-1);
        setModal({ ...modal, show: false });
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [window, modal]);

  const close = () => {
    if (modal && modal.show) {
      navigate(-1);
    }
  };

  const open = (data: ModalData) => {
    for (let i = 0; i < 2; i++) {
      window.history.pushState(
        { ...window.history.state, modal: data.name },
        '',
        '',
      );
    }
    setModal({ ...data, show: true });
  };

  return { close, open, Modal, modal };
};

export default useModal;
