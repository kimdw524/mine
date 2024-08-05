import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Modal from './Modal';

export interface ModalData {
  name: string;
  component: ReactElement;
  show?: boolean;
}

interface ModalContextType {
  modals: ModalData[];
  push: (data: ModalData) => void;
  pop: () => void;
}

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = (props: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalData[]>([]);

  const push = (data: ModalData) => {
    setModals((modals) => [...modals, data]);
    window.history.pushState(
      { ...window.history.state, type: 'modal', name: data.name },
      '',
      '',
    );
  };

  const pop = (name: string) => {
    setModals((modals) => {
      for (let i = modals.length - 1; i >= 0; i--) {
        if (!modals[i].show && modals[i].name === name) {
          return [...modals.slice(0, i), ...modals.slice(i + 1)];
        }
      }
      return modals;
    });
  };

  const hide = () => {
    setModals((modals) => {
      for (let i = modals.length - 1; i >= 0; i--) {
        if (modals[i].show) {
          modals[i].show = false;
          break;
        }
      }
      return [...modals];
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      hide();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ modals, push, pop: hide }}>
      {props.children}
      {modals.map((modal) => (
        <Modal
          key={modal.name}
          data={modal}
          onFadeOutEnd={() => pop(modal.name)}
        />
      ))}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const modalContext = useContext(ModalContext);

  const pop = () => {
    window.history.back();
  };

  const push = (data: ModalData) => {
    modalContext.push({ ...data, show: true });
  };

  return { push, pop };
};

export default useModal;
