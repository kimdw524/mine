/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { nickEditContainerCss } from './style';
import NickEditFetch from './NickEditFetch';
import { ErrorBoundary } from 'react-error-boundary';

const NickEdit = () => {
  return (
    <>
      <div css={nickEditContainerCss}>
        <AppBar
          label="닉네임 변경"
          onBackClick={() => console.log('to main page')}
        />
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
