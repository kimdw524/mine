/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { buttonContainerCss, questionCss } from './style';
import { Button, TextField, Typography } from 'oyc-ds';
import MultipleChoice from '../../../components/molecules/MultipleChoice';

interface QnAProps {
  question: string;
  choices?: string[];
  onSubmit: (index: number) => void;
}

/**
 * 질문지에 해당하는 답변을 할 수 있는 컴포넌트.
 * choices가 주어지면 객관식, 아닌 경우 주관식
 */
const QnA = ({ question, choices = [], onSubmit }: QnAProps) => {
  const [selected, setSelected] = useState<number>(choices.length ? -1 : 0);

  return (
    <>
      <Typography css={questionCss} size="lg" color="dark">
        {question}
      </Typography>
      {choices.length ? (
        <MultipleChoice
          items={choices}
          selected={selected}
          onSelect={(index) => setSelected(index)}
        />
      ) : (
        <TextField
          label="답변"
          defaultValue=""
          value=""
          variant="standard"
          maxRows={5}
          style={{ marginBottom: '1rem' }}
          multiLine
        />
      )}
      <div css={buttonContainerCss}>
        <Button disabled={selected === -1} onClick={() => onSubmit(selected)}>
          다음
        </Button>
      </div>
    </>
  );
};

export default QnA;
