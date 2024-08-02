/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { nickEditContainerCss } from './style';
import NickEditFetch from './NickEditFetch';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const NickEdit = () => {
  const nav = useNavigate();

  return (
    <>
      <div css={nickEditContainerCss}>
        <AppBar label="닉네임 변경" onBackClick={() => nav('/mypage')} />
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <NickEditFetch />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default NickEdit;
