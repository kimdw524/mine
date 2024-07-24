/** @jsxImportSource @emotion/react */
import { Button, Progress, Typography } from 'oyc-ds';
import React, { useState } from 'react';
import { descCss, sentenceCss } from './style';
import Record from './Record';
import { useTheme } from '@emotion/react';
import { buttonContainerCss } from '../../../components/organisms/QnA/style';
import { SentenceData } from '../../../apis/avatarApi';

interface ReadProps {
  items: SentenceData[];
  onSubmit: () => void;
}

const Read = ({ items, onSubmit }: ReadProps) => {
  const theme = useTheme();
  const [index, setIndex] = useState<number>(0);
  const [audio, setAudio] = useState<string>('');

  const handleRecord = (data: string) => {
    setAudio(data);
  };

  const handleNextClick = () => {
    if (index >= items.length - 1) {
      onSubmit();
      return;
    }
    setIndex(index + 1);
    setAudio('');
  };

  return (
    <>
      <Typography color="dark">문장읽기</Typography>
      <Typography css={descCss}>
        {index >= items.length - 1
          ? '마지막 문항이에요.'
          : `${items.length - index} 문항 남았어요.`}
      </Typography>
      <Progress value={index} max={items.length} size="lg" />
      <Typography
        size="sm"
        style={{
          marginTop: '1rem',
        }}
      >
        녹음 버튼을 누르고 다음 문장을 읽어주세요.
      </Typography>
      <div
        css={sentenceCss}
        style={{ backgroundColor: theme.colors.light.hover }}
      >
        <Typography color="dark" size="lg">
          {items[index].description}
        </Typography>
      </div>
      <Record key={index} onRecord={handleRecord} />
      <div css={buttonContainerCss}>
        <Button disabled={audio === ''} onClick={handleNextClick}>
          다음
        </Button>
      </div>
    </>
  );
};

export default Read;
