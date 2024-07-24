/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from 'oyc-ds';
import { instCss } from './style';

const Done = () => {
  return (
    <>
      <Typography size="md" weight="medium" color="dark" css={instCss}>
        아바타 생성 완료
      </Typography>
    </>
  );
};

export default Done;
