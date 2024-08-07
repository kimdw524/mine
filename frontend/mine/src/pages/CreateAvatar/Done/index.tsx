/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Typography } from 'oyc-ds';
import { instCss } from './style';
import { useNavigate } from 'react-router-dom';

const Done = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography size="xl" weight="medium" color="dark" css={instCss}>
        나만의 아바타가
        <br />
        완성되었습니다.
      </Typography>
      <Button size="xl" fullWidth onClick={() => navigate('/')}>
        홈으로 가기
      </Button>
    </>
  );
};

export default Done;
