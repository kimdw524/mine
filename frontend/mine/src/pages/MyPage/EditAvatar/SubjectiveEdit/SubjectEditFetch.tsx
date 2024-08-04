/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  NewAnsListData,
  updateAvatarSubjective,
} from '../../../../apis/avatarApi';
import EditQnA from '../EditQnA';
import { controlBtnCss, editBtnCss, editListCss } from './style';
import { Button, Icon, Typography } from 'oyc-ds';
import { NotificationContext } from '../../../../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { HashtagIcon } from '@heroicons/react/24/solid';
import { getQuestions, getAnswers } from '../../../../apis/mypageApi';
import { IAnswer, INewAnswer, IQuestion } from '../../../../types/qnaType';

interface ISubjectEditFetchProps {
  avatarId: number;
}

const SubjectEditFetch = ({ avatarId }: ISubjectEditFetchProps) => {
  const [questionQuery, answerQuery] = useSuspenseQueries({
    queries: [
      { queryKey: ['questions'], queryFn: () => getQuestions() },
      { queryKey: ['answers'], queryFn: () => getAnswers(avatarId) },
    ],
  });

  [questionQuery, answerQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const notificationContext = useContext(NotificationContext);
  const nav = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [editTarget, setEditTarget] = useState<INewAnswer[]>([]);

  useEffect(() => {
    setQuestions(
      questionQuery.data.data.filter((q: IQuestion) => q.type === 's'),
    );
    setAnswers(
      answerQuery.data.data.filter((a: IAnswer) => a.questionType === 's'),
    );
  }, []);

  useEffect(() => {
    const newAns: INewAnswer[] = [];
    questions.map((q: IQuestion) => {
      newAns.push({
        questionId: q.questionId,
        isNew: false,
        newAns: '',
      });
    });
  }, [questions]);

  const handleTarget = useCallback(
    (Qidx: number, isNew: boolean, newAns: string) => {
      setEditTarget((prev) => {
        const newTarget = [...prev];
        newTarget[Qidx] = {
          questionId: prev[Qidx].questionId,
          isNew: isNew,
          newAns: newAns,
        };
        return [...newTarget];
      });
    },
    [],
  );

  const handleResponse = useCallback(
    (Qidx: number, ans: string | number) => {
      handleTarget(Qidx, !(answers[Qidx].answer === ans), String(ans));
    },
    [answers],
  );

  const handleSubmit = async () => {
    const newSubjectives: NewAnsListData = {
      avatarId: 123,
      anss: [],
    };

    editTarget.map((target: INewAnswer) => {
      if (target.isNew) {
        newSubjectives.anss.push({
          questionId: target.questionId,
          ansId: target.newAns,
        });
      }
    });

    await updateAvatarSubjective(newSubjectives)
      .then(() => {
        notificationContext.handle(
          'contained',
          'success',
          '질의응답이 성공적으로 변경되었습니다',
        );
        nav('/mypage');
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <>
      {questions.map((q: IQuestion, idx: number) => {
        return (
          <EditQnA
            key={idx}
            question={q}
            answer={answers[idx]}
            qidx={idx}
            invisible={index !== idx}
            handleResponse={handleResponse}
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
          onClick={() => setIndex((index) => index + 1)}
          disabled={index === questions.length - 1}
        >
          <Typography size="sm" color="light">
            다음
          </Typography>
        </Button>
      </div>
      <div css={editBtnCss}>
        <div
          css={editListCss(
            editTarget.filter((v: INewAnswer) => v.isNew).length,
          )}
        >
          <Icon color="primary">
            <HashtagIcon />
          </Icon>
          <Typography color="dark" size="sm">
            {editTarget.map((v: INewAnswer, i: number) =>
              v.isNew ? `${i + 1}번 ` : '',
            )}
          </Typography>
        </div>
        <Button
          fullWidth
          disabled={editTarget.filter((v: INewAnswer) => v.isNew).length === 0}
          onClick={handleSubmit}
        >
          수정하기
        </Button>
      </div>
    </>
  );
};

export default SubjectEditFetch;
