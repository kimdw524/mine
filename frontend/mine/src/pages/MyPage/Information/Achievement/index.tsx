/** @jsxImportSource @emotion/react */
import { Typography } from 'oyc-ds';
import React from 'react';
import { achievementTitle } from './style';

const Achievement = () => {
  return (
    <>
      <div css={achievementTitle}>
        <Typography weight="bold" color="dark" size="xl">
          업적
        </Typography>
      </div>
    </>
  );
};

export default Achievement;
