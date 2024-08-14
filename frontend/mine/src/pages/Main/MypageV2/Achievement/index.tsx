/** @jsxImportSource @emotion/react */
import React, { Suspense } from 'react';
import { achievementTitle } from './style';
import { ErrorBoundary } from 'react-error-boundary';
import AchievementFetch from './AchievementFetch';
import AppBar from '../../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import Error from '../../../../components/molecules/Error';
import Loading from '../../../../components/molecules/Loading';

const Achievement = () => {
  const nav = useNavigate();
  return (
    <>
      <div css={achievementTitle}>
        <AppBar
          label={'업적'}
          onBackClick={() => nav('/', { state: { step: 2 } })}
          style={{ zIndex: 10000 }}
        />
        <ErrorBoundary fallbackRender={Error}>
          <Suspense fallback={<Loading />}>
            <AchievementFetch />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Achievement;
