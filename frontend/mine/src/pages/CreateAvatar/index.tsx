/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { containerCss, appBarCss, innerCss } from './style';
import CreateAvatarFetch from './CreateAvatarFetch';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const CreateAvatar = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div css={containerCss}>
      <AppBar
        label="아바타 만들기"
        onBackClick={() => navigate('/')}
        css={appBarCss}
      >
        <AppBar.Progress value={step} max={3} />
      </AppBar>
      <div css={innerCss}>
        <ErrorBoundary fallback={<>에러</>}>
          <Suspense fallback={<>로딩중</>}>
            <CreateAvatarFetch
              step={step}
              onChangeStep={(step) => setStep(step)}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default CreateAvatar;
