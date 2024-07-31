/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AvatarInfoFetch from './AvatarInfoFetch';

const AvatarInfo = () => {
  return (
    <>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <AvatarInfoFetch />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AvatarInfo;
