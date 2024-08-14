/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Typography } from 'oyc-ds';
import { instCss, processCss } from './style';
import {
  CheckCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline';
import Process from '../../../components/molecules/Process';

interface IntroProps {
  onCreateClick: () => void;
}

const Intro = ({ onCreateClick }: IntroProps) => {
  return (
    <>
      <Typography size="md" weight="medium" color="dark" css={instCss}>
        아바타를 생성하려면
        <br />
        다음과 같은 3가지 과정이 필요해요.
      </Typography>
      <div css={processCss}>
        <Process description="설문조사">
          <CheckCircleIcon />
        </Process>
        <Process description="문장읽기">
          <SpeakerWaveIcon />
        </Process>
        <Process description="정보입력">
          <ChatBubbleBottomCenterTextIcon />
        </Process>
      </div>
      <Typography color="secondary" size="xs" style={{ margin: '1rem 0' }}>
        평균적으로 약 5분 정도 시간이 소요됩니다.
      </Typography>
      <Button onClick={onCreateClick} size="lg" fullWidth>
        시작하기
      </Button>
    </>
  );
};

export default Intro;
