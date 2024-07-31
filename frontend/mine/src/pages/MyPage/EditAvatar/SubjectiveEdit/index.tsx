/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { avatarSubjectEditContainerCss, questionCss, titleCss } from './style';
import { Typography } from 'oyc-ds';
import { ErrorBoundary } from 'react-error-boundary';
import SubjectEditFetch from './SubjectEditFetch';

const SubjectiveEdit = () => {
  const location = useLocation();
  const nav = useNavigate();
  return (
    <>
      <div css={avatarSubjectEditContainerCss}>
        <AppBar
          label={location.state.name}
          onBackClick={() => nav('/mypage')}
        />
        <div css={titleCss}>
          <Typography size="md" color="dark">
            질의응답
          </Typography>
        </div>
        <div css={questionCss}>
          <ErrorBoundary fallback={<>에러</>}>
            <Suspense fallback={<>로딩중</>}>
              <SubjectEditFetch />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default SubjectiveEdit;
