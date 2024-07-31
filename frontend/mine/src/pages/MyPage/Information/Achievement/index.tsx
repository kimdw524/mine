/** @jsxImportSource @emotion/react */
import { Typography } from 'oyc-ds';
import React, { Suspense } from 'react';
import { achievementTitle } from './style';
import { ErrorBoundary } from 'react-error-boundary';
import AchievementFetch from './AchievementFetch';

const Achievement = () => {
  return (
    <>
      <div css={achievementTitle}>
        <Typography color="dark" size="lg">
          업적
        </Typography>
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <AchievementFetch />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Achievement;
