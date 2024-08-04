/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { avatarChoiceEditContainerCss, questionCss, titleCss } from './style';
import { Typography } from 'oyc-ds';
import ChoiceEditFetch from './ChoiceEditFetch';
import { ErrorBoundary } from 'react-error-boundary';

const ChoiceEdit = () => {
  const location = useLocation();
  const nav = useNavigate();

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
        <div css={questionCss}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <ChoiceEditFetch avatarId={location.state.avatarId} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default ChoiceEdit;
