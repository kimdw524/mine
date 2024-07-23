/** @jsxImportSource @emotion/react */
import { Progress, Typography } from 'oyc-ds';
import React, { useState } from 'react';
import { descCss } from './style';
import QnA from '../../../components/organisms/QnA';

export interface QuestionData {
  questionId: number;
  description: string;
  choices: string[];
}

interface ChoiceProps {
  items: QuestionData[];
  onSubmit: () => void;
}

const Choice = ({ items, onSubmit }: ChoiceProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleSubmit = (selected: number) => {
    if (index >= items.length - 1) {
      onSubmit();
      return;
    }

    setIndex((index) => index + 1);
  };

  return (
    <React.Fragment>
      <Typography color="dark">설문조사</Typography>
      <Typography css={descCss}>
        {index >= items.length - 1
          ? '마지막 문항이에요.'
          : `${items.length - index} 문항 남았어요.`}
      </Typography>
      <Progress value={index + 1} max={items.length} size="lg" />
      <QnA
        key={index}
        question={items[index].description}
        choices={items[index].choices}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default Choice;
