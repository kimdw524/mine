/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAvatarQuestionAnswer } from '../../../../apis/avatarApi';
import EditQnA, { IEditQnA } from '../EditQnA';
import { controlBtnCss } from './style';
import { Button, Typography } from 'oyc-ds';

interface IChoiceEditFetch {
  handleTarget: (Qidx: number, value: boolean) => void;
}

const ChoiceEditFetch = ({ handleTarget }: IChoiceEditFetch) => {
  const [index, setIndex] = useState<number>(0);

  const questionQuery = useSuspenseQuery({
    queryKey: ['questions'],
    queryFn: () => getAvatarQuestionAnswer(0),
  });

  if (questionQuery.error && !questionQuery.isFetching) {
    throw questionQuery.error;
  }

  // Qidx 번 문제가 답이 바뀌어는지 제어
  const onHandleResponse = useCallback((Qidx: number, Aidx: number) => {
    // 기존의 답과 같다면 true 를, 다르다면 false 를
    handleTarget(Qidx, !(questionQuery.data.data[Qidx].answer === Aidx + 1));
  }, []);

  return (
    <>
      {/* 문제에게  전달 */}
      {questionQuery.data.data
        .filter((qna: IEditQnA) => qna.questionType === 'c')
        .map((qna: IEditQnA, idx: number) => {
          return (
            <EditQnA
              key={idx}
              qnaType={'c'}
              qna={qna}
              qidx={idx}
              invisible={index !== idx}
              onHandleResponse={onHandleResponse}
            />
          );
        })}

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
          onClick={() => {
            setIndex((index) => index + 1);
          }}
          disabled={
            index ===
            questionQuery.data.data.filter(
              (qna: IEditQnA) => qna.questionType === 'c',
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

export default ChoiceEditFetch;
