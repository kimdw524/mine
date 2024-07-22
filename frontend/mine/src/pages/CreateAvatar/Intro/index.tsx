/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Typography } from 'oyc-ds';
import { instCss } from './style';

interface IntroProps {
  onCreateClick: () => void;
}

const Intro = ({ onCreateClick }: IntroProps) => {
  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        설명 123456
      </Typography>
      <Button onClick={onCreateClick}>만들기</Button>
    </>
  );
};

export default Intro;
