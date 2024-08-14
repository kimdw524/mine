/** @jsxImportSource @emotion/react */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Error from '../../../components/molecules/Error';
import Loading from '../../../components/molecules/Loading';
import MenuBar from './menubar';

const AccountChart = () => {
  return (
    <>
      <ErrorBoundary fallbackRender={Error}>
        <Suspense fallback={<Loading />}>
          <MenuBar />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AccountChart;
