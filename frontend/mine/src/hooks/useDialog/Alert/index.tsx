/** @jsxImportSource @emotion/react */
import { Button } from 'oyc-ds';
import React, { ReactNode } from 'react';
import { alertCss, buttonContainerCss, messageCss } from './style';

interface AlertProps {
  children: ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  const handleClose = () => {
    window.history.go(-1);
  };

  const handleAlertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div css={alertCss} onClick={handleAlertClick}>
      <div css={messageCss}>{children}</div>
      <div css={buttonContainerCss}>
        <Button onClick={handleClose} size="sm">
          확인
        </Button>
      </div>
    </div>
  );
};

export default Alert;
