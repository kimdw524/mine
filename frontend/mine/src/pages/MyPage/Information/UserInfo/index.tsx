/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { userInfoTitle } from './style';
import { Typography } from 'oyc-ds';
import { ErrorBoundary } from 'react-error-boundary';
import UserInfoFetch from './UserInfoFetch';

const UserInfo = () => {
  return (
    <>
      <div css={userInfoTitle}>
        <Typography color="dark" size="lg">
          회원정보
        </Typography>
      </div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <UserInfoFetch />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default UserInfo;
