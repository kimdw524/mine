/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Typography } from 'oyc-ds';
import React from 'react';

interface EventMessage {
  title: string;
  value: string;
  onClick: () => void;
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EventMessage = ({ title, value, onClick }: EventMessage) => {
  return (
    <div css={containerCss}>
      <Typography color="dark">{title}</Typography>
      <Button variant="outlined" size="sm" onClick={onClick}>
        {value}
      </Button>
    </div>
  );
};

export default EventMessage;
