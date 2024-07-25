/** @jsxImportSource @emotion/react */
import React from 'react';
import { BackDrop, Toast, Typography } from 'oyc-ds';
import { toastCss } from './style';

interface INotification {
  ment: string;
}

const Notification = ({ ment }: INotification) => {
  return (
    <BackDrop opacity={0} blur={0}>
      <div css={toastCss}>
        <Toast>
          <Typography size="md" color="dark">
            {ment}
          </Typography>
        </Toast>
      </div>
    </BackDrop>
  );
};

export default Notification;
