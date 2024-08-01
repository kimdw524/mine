/** @jsxImportSource @emotion/react */
import React, { Suspense, useCallback, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  avatarChoiceEditContainerCss,
  editBtnCss,
  editListCss,
  questionCss,
  titleCss,
} from './style';
import { Button, Icon, Typography } from 'oyc-ds';
import ChoiceEditFetch from './ChoiceEditFetch';
import { ErrorBoundary } from 'react-error-boundary';
import { HashtagIcon } from '@heroicons/react/16/solid';

const ChoiceEdit = () => {
  const location = useLocation();
  const nav = useNavigate();

  const [editTarget, setEditTarget] = useState<boolean[]>(
    new Array(3).fill(false),
  );

  const handleTarget = useCallback((Qidx: number, value: boolean) => {
    setEditTarget((prev) => {
      const newTarget = [...prev];
      newTarget[Qidx] = value;
      return [...newTarget];
    });
  }, []);

  return (
    <>
      <div css={avatarChoiceEditContainerCss}>
        <AppBar
          label={location.state.name}
          onBackClick={() => nav('/mypage')}
        />
        <div css={titleCss}>
          <Typography size="md" color="dark">
            설문조사
          </Typography>
        </div>

        {/* 문제 띄우기 */}
        <div css={questionCss}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <ChoiceEditFetch handleTarget={handleTarget} />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div css={editBtnCss}>
          <div css={editListCss(editTarget.filter((v) => v).length)}>
            <Icon color="primary">
              <HashtagIcon />
            </Icon>
            <Typography color="dark" size="sm">
              {editTarget.map((v, i) => (v ? `${i + 1}번 ` : ''))}
            </Typography>
          </div>
          <Button fullWidth disabled={editTarget.filter((v) => v).length === 0}>
            수정하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChoiceEdit;
