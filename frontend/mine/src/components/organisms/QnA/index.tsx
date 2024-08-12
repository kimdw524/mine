/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import { buttonContainerCss, questionCss } from './style';
import { Button, TextField, Typography } from 'oyc-ds';
import MultipleChoice from '../../../components/molecules/MultipleChoice';
import { QuestionAnswer, QuestionChoice } from '../../../apis/avatarApi';
import useDialog from '../../../hooks/useDialog';

interface QnAProps {
  question: string;
  choices?: QuestionChoice[];
  back: boolean;
  defaultValue: QuestionAnswer;
  onSubmit: (choice: number | null, answer: string | null) => void;
  onBack: () => void;
}

/**
 * 질문지에 해당하는 답변을 할 수 있는 컴포넌트.
 * choices가 주어지면 객관식, 아닌 경우 주관식
 */
const QnA = ({
  question,
  choices = [],
  back,
  defaultValue,
  onSubmit,
  onBack,
}: QnAProps) => {
  const [selected, setSelected] = useState<number>(
    choices.length
      ? defaultValue
        ? choices.findIndex(
            (choice) =>
              choice.questionChoiceId === defaultValue.questionChoiceId,
          )
        : -1
      : 0,
  );
  const textRef = useRef<HTMLInputElement>(null);
  const { alert } = useDialog();

  const handleClick = () => {
    const answer = (textRef.current?.value || '').trim();

    if (choices.length === 0 && answer === '') {
      alert('답변을 입력해 주세요.');
      return;
    }

    onSubmit(
      choices.length ? choices[selected].questionChoiceId : null,
      choices.length ? null : answer,
    );
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
          defaultValue={(defaultValue && defaultValue.subjectiveAns) || ''}
          value=""
          variant="standard"
          maxRows={5}
          style={{ marginBottom: '1rem' }}
          multiLine
        />
      )}
      <div css={buttonContainerCss}>
        <Button disabled={!back} color="secondary" onClick={onBack}>
          이전
        </Button>
        <Button disabled={selected === -1} onClick={handleClick}>
          다음
        </Button>
      </div>
    </>
  );
};

export default QnA;
