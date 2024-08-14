/** @jsxImportSource @emotion/react */
import React from 'react';
import { Toast, Typography } from 'oyc-ds';
import { toastCss } from './style';
import { INotification } from '../../../utils/NotificationContext';

const Notification = ({ notiInfo }: INotification) => {
  return (
    <div css={toastCss}>
      <Toast variant={notiInfo.variant} color={notiInfo.color}>
        <Typography size="md" color="dark">
          {notiInfo.msg}
        </Typography>
      </Toast>
    </div>
  );
};

export default Notification;
