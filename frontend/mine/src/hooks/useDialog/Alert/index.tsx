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
}

const Alert = ({ children }: AlertProps) => {
  const handleBackDropClick = () => {
    window.history.go(-1);
  };

  const handleAlertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <BackDrop
      opacity={0.2}
      blur={0}
      css={backDropCss}
      onClick={handleBackDropClick}
    >
      <div css={containerCss}>
        <div css={alertCss} onClick={handleAlertClick}>
          <div css={messageCss}>{children}</div>
          <div css={buttonContainerCss}>
            <Button onClick={handleBackDropClick} size="sm">
              확인
            </Button>
          </div>
        </div>
      </div>
    </BackDrop>
  );
};

export default Alert;
