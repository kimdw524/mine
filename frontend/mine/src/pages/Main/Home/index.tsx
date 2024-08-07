/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import HomeFetch from './HomeFetch';
import { ErrorBoundary } from 'react-error-boundary';

const Home = () => {
  return (
    <ErrorBoundary fallback={<>에러</>}>
      <Suspense fallback={<>로딩중</>}>
        <HomeFetch />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
