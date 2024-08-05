/** @jsxImportSource @emotion/react */
import { BackDrop, Button } from 'oyc-ds';
import React, { ReactNode } from 'react';
import {
  alertCss,
  backDropCss,
  buttonContainerCss,
  containerCss,
  messageCss,
} from './style';

interface AlertProps {
  children: ReactNode;
  onYesClick: () => void;
}

const Confirm = ({ children, onYesClick }: AlertProps) => {
  const handleBackDropClick = () => {
    window.history.go(-1);
  };

  const handleAlertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <BackDrop
      opacity={0.3}
      blur={0}
      css={backDropCss}
      onClick={handleBackDropClick}
    >
      <div css={containerCss}>
        <div css={alertCss} onClick={handleAlertClick}>
          <div css={messageCss}>{children}</div>
          <div css={buttonContainerCss}>
            <Button onClick={() => onYesClick()} size="sm" color="primary">
              예
            </Button>
            <Button onClick={handleBackDropClick} color="secondary" size="sm">
              아니오
            </Button>
          </div>
        </div>
      </div>
    </BackDrop>
  );
};

export default Confirm;
