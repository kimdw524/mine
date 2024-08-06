/** @jsxImportSource @emotion/react */
import { Button } from 'oyc-ds';
import React, { ReactNode } from 'react';
import { alertCss, buttonContainerCss, messageCss } from './style';

interface AlertProps {
  children: ReactNode;
  onYesClick: () => void;
}

const Confirm = ({ children, onYesClick }: AlertProps) => {
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
        <Button onClick={() => onYesClick()} size="sm" color="primary">
          예
        </Button>
        <Button onClick={handleClose} color="secondary" size="sm">
          아니오
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
