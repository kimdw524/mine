/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getAvatarQuestionAnswer,
  NewAnsListData,
  updateAvatarChoice,
} from '../../../../apis/avatarApi';
import EditQnA, { IEditQnA } from '../EditQnA';
import { controlBtnCss, editBtnCss, editListCss } from './style';
import { Button, Typography, Icon } from 'oyc-ds';
import { HashtagIcon } from '@heroicons/react/24/solid';
import { NotificationContext } from '../../../../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface INewAnswer {
  questionId: number;
  isNew: boolean;
  newAns: number;
}

const ChoiceEditFetch = () => {
  const questionQuery = useSuspenseQuery({
    queryKey: ['questions'],
    queryFn: () => getAvatarQuestionAnswer(0),
  });

  if (questionQuery.error && !questionQuery.isFetching) {
    throw questionQuery.error;
  }

  const notificationContext = useContext(NotificationContext);
  const nav = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [qnas, setQnas] = useState<IEditQnA[]>([]);
  const [editTarget, setEditTarget] = useState<INewAnswer[]>([]);

  useEffect(() => {
    const newQnAs: IEditQnA[] = [];
    const newAns: INewAnswer[] = [];

    questionQuery.data.data.map((qna: IEditQnA) => {
      if (qna.questionType === 'c') {
        newQnAs.push(qna);
        newAns.push({
          questionId: qna.questionId,
          isNew: false,
          newAns: -1,
        });
      }
    });

    setQnas(() => [...newQnAs]);
    setEditTarget(() => [...newAns]);
  }, []);

  const handleTarget = useCallback(
    (Qidx: number, isNew: boolean, newAns: number) => {
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

  const handleResponse = useCallback((Qidx: number, Aidx: number | string) => {
    handleTarget(
      Qidx,
      !(qnas[Qidx].answer === Number(Aidx) + 1),
      Number(Aidx) + 1,
    );
  }, []);

  const handleSubmit = async () => {
    const newChoices: NewAnsListData = {
      avatarId: 123,
      anss: [],
    };

    editTarget.map((target: INewAnswer) => {
      if (target.isNew) {
        newChoices.anss.push({
          questionId: target.questionId,
          ansId: target.newAns,
        });
      }
    });

    await updateAvatarChoice(newChoices)
      .then(() => {
        notificationContext.handle(
          'contained',
          'success',
          '설문조사가 성공적으로 변경되었습니다',
        );
        nav('/mypage');
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <>
      {qnas.map((qna: IEditQnA, idx: number) => {
        return (
          <EditQnA
            key={idx}
            qnaType={'c'}
            qna={qna}
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
          onClick={() => {
            setIndex((index) => index + 1);
          }}
          disabled={index === qnas.length - 1}
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

export default ChoiceEditFetch;
