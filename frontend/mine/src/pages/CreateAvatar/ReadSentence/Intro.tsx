/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Typography } from 'oyc-ds';
import React from 'react';

interface IntroProps {
  onStartClick: () => void;
}

const descCss = css`
  margin: 1rem 0;
  line-height: 175%;
`;

const Intro = ({ onStartClick }: IntroProps) => {
  return (
    <>
      <Typography size="lg" color="dark">
        문장 읽기 🥔
      </Typography>
      <Typography color="dark" css={descCss}>
        나만의 아바타에게 학습시킬 목소리를 녹음할 거예요.
        <br />
        녹음 버튼을 누르고 주어진 문장을 읽어 주세요.
      </Typography>
      <Typography size="xs" color="danger">
        원할하게 녹음할 수 있는 환경에서 진행하는 걸 권장합니다.
      </Typography>
      <Button
        size="lg"
        fullWidth
        style={{ marginTop: '1rem' }}
        onClick={onStartClick}
      >
        시작하기
      </Button>
    </>
  );
};

export default Intro;
