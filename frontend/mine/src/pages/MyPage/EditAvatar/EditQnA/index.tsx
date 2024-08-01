/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from 'oyc-ds';
import { btnContainerCss, containerCss, textfieldCss } from './style';

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
  qidx: number;
  invisible: boolean;
  handleResponse: (Qidx: number, Aidx: number | string) => void;
}

const EditQnA = ({
  qnaType,
  qna,
  qidx,
  invisible,
  handleResponse,
}: EditQnAProps) => {
  const [selected, setSelected] = useState<string | number>(qna.answer);

  useEffect(() => {
    setSelected(qna.answer);
  }, [qna]);

  return (
    <>
      <div css={containerCss(invisible)}>
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
                  onClick={() => {
                    setSelected(idx + 1);
                    handleResponse(qidx, idx);
                  }}
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
              onChange={(e) => handleResponse(qidx, e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditQnA;
