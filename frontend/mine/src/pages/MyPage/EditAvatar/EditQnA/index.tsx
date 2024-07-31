/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button, TextField, Typography } from 'oyc-ds';
import { btnContainerCss, textfieldCss } from './style';

export interface IQnAResponse {
  responseId: number;
  response: string;
}

export interface IEditQnA {
  questionType: string;
  questionId: number;
  question: string;
  choices: IQnAResponse[];
  answer: string | number;
}

interface EditQnAProps {
  qnaType: string;
  qna: IEditQnA;
}

const EditQnA = ({ qnaType, qna }: EditQnAProps) => {
  const [selected, setSelected] = useState<string | number>(qna.answer);
  return (
    <>
      <Typography size="lg" color="dark">
        {qna.question}
      </Typography>
      {qnaType === 'c' ? (
        <div css={btnContainerCss}>
          {qna.choices.map((item, idx) => {
            return (
              <Button
                key={item.responseId}
                color={selected === idx + 1 ? 'primary' : 'secondary'}
                variant="outlined"
                size="lg"
                onClick={() => setSelected(idx + 1)}
              >
                {item.response}
              </Button>
            );
          })}
        </div>
      ) : (
        <div css={textfieldCss}>
          <TextField
            label=""
            defaultValue={qna.answer + ''}
            variant="outlined"
            maxRows={5}
            multiLine
          />
        </div>
      )}
    </>
  );
};

export default EditQnA;
