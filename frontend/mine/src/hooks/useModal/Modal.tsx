/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, useEffect, useState } from 'react';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import styles from './Modal.module.css';

interface ModalProps extends React.ComponentProps<'div'> {
  modal: ReactNode;
}

const classNames = {
  normal: styles.fade,
  enter: styles['fade-enter'],
  exit: styles['fade-exit'],
};

const containerCss = css`
  position: absolute;
  inset: 0 0 0 0;
`;

const Modal = ({ modal }: ModalProps) => {
  return (
    <>
      <TransitionAnimation
        data-key={modal === null ? '' : 'modal'}
        className={classNames}
      >
        <React.Fragment key="">zz</React.Fragment>
        <div key="modal" css={containerCss}>
          {modal}모달
          {123213}
        </div>
      </TransitionAnimation>
      {modal}
    </>
  );
};

Modal.Item = () => {};

export default Modal;
