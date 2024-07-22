/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Typography } from 'oyc-ds';
import { instCss } from './style';

interface ChoiceProps {
  onSubmit: () => void;
}

const Choice = ({ onSubmit }: ChoiceProps) => {
  return (
    <>
      {new Array(100).fill(0).map((i, idx) => (
        <div key={idx}>
          <Typography
            size={'xl'}
            weight={'medium'}
            color={'dark'}
            css={instCss}
          >
            설명 {idx}
          </Typography>
          <Button onClick={onSubmit}>만들기</Button>
        </div>
      ))}
    </>
  );
};

export default Choice;
