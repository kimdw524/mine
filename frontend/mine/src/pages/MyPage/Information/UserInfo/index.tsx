/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { userInfoTitle, userInfoBtn } from './style';
import { Button, Typography } from 'oyc-ds';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import UserInfoFetch from './UserInfoFetch';

const UserInfo = () => {
  return (
    <>
      <div css={userInfoTitle}>
        <Typography weight="bold" color="dark" size="xl">
          회원정보
        </Typography>
      </div>
      <ErrorBoundary fallback={<>에러</>}>
        <Suspense fallback={<>로딩중</>}>
          <UserInfoFetch />
        </Suspense>
      </ErrorBoundary>
      <div css={userInfoBtn}>
        <Link to="/mypage/nickname">
          <Button fullWidth>닉네임 변경</Button>
        </Link>
        <Link to="/mypage/password">
          <Button fullWidth>비밀번호 변경</Button>
        </Link>
      </div>
    </>
  );
};

export default UserInfo;
