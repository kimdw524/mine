/** @jsxImportSource @emotion/react */
import { Progress, Typography } from 'oyc-ds';
import React, { useState } from 'react';
import { descCss } from './style';
import QnA from '../../../components/organisms/QnA';

export interface SubjectiveQuestionData {
  questionId: number;
  description: string;
}

interface SubjectProps {
  items: SubjectiveQuestionData[];
  onSubmit: () => void;
}

const Subject = ({ items, onSubmit }: SubjectProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleSubmit = () => {
    if (index >= items.length - 1) {
      onSubmit();
      return;
    }

    setIndex((index) => index + 1);
  };

  return (
    <>
      <Typography color="dark">질의응답</Typography>
      <Typography css={descCss}>
        {index >= items.length - 1
          ? '마지막 문항이에요.'
          : `${items.length - index} 문항 남았어요.`}
      </Typography>
      <Progress value={index} max={items.length} size="lg" />
      <QnA
        key={index}
        question={items[index].description}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Subject;
