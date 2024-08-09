/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../../../components/molecules/Loading';
import Error from '../../../components/molecules/Error';
import ChatFetch from './ChatFetch';

const Chat = () => {
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={<Loading />}>
        <ChatFetch />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Chat;
