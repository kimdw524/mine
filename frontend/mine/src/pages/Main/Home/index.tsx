/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import HomeFetch from './HomeFetch';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../../../components/molecules/Loading';
import Error from '../../../components/molecules/Error';

const Home = () => {
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={<Loading />}>
        <HomeFetch />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
