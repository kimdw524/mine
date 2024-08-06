/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import { buttonContainerCss, questionCss } from './style';
import { Button, TextField, Typography } from 'oyc-ds';
import MultipleChoice from '../../../components/molecules/MultipleChoice';
import { QuestionChoice } from '../../../apis/avatarApi';
import useDialog from '../../../hooks/useDialog';

interface QnAProps {
  question: string;
  choices?: QuestionChoice[];
  onSubmit: (choice: number, answer: string) => void;
}

/**
 * 질문지에 해당하는 답변을 할 수 있는 컴포넌트.
 * choices가 주어지면 객관식, 아닌 경우 주관식
 */
const QnA = ({ question, choices = [], onSubmit }: QnAProps) => {
  const [selected, setSelected] = useState<number>(choices.length ? -1 : 0);
  const textRef = useRef<HTMLInputElement>(null);
  const { alert } = useDialog();

  const handleClick = () => {
    const answer = (textRef.current?.value || '').trim();

    if (choices.length === 0 && answer === '') {
      alert('답변을 입력해 주세요.');
      return;
    }

    onSubmit(selected + 1, answer);
  };

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
          ref={textRef}
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
        <Button disabled={selected === -1} onClick={handleClick}>
          다음
        </Button>
      </div>
    </>
  );
};

export default QnA;
