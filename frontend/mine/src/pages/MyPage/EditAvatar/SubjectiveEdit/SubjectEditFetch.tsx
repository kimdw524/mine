/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAvatarQuestionAnswer } from '../../../../apis/avatarApi';
import EditQnA, { IEditQnA } from '../EditQnA';
import { controlBtnCss } from './style';
import { Button, Typography } from 'oyc-ds';

const SubjectEditFetch = () => {
  const [index, setIndex] = useState<number>(0);

  const questionQuery = useSuspenseQuery({
    queryKey: ['questions'],
    queryFn: () => getAvatarQuestionAnswer(0),
  });

  if (questionQuery.error && !questionQuery.isFetching) {
    throw questionQuery.error;
  }

  return (
    <>
      <EditQnA
        qnaType={'s'}
        qna={
          questionQuery.data.data.filter(
            (qna: IEditQnA) => qna.questionType === 's',
          )[index]
        }
      />
      <div css={controlBtnCss}>
        <Button
          color="secondary"
          onClick={() => setIndex((index) => index - 1)}
          disabled={index === 0}
        >
          <Typography size="sm" color="light">
            이전
          </Typography>
        </Button>
        <Button
          onClick={() => setIndex((index) => index + 1)}
          disabled={
            index ===
            questionQuery.data.data.filter(
              (qna: IEditQnA) => qna.questionType === 's',
            ).length -
              1
          }
        >
          <Typography size="sm" color="light">
            다음
          </Typography>
        </Button>
      </div>
    </>
  );
};

export default SubjectEditFetch;
