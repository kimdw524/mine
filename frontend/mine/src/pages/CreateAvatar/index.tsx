/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import Intro from './Intro';
import { containerCss } from './style';
import styles from './CreateAvatar.module.css';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import Choice from './Choice';

const CreateAvatar = () => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    document.querySelector('#root')?.scrollTo({ top: 0 });
  }, [step]);

  return (
    <>
      <AppBar
        label="아바타 만들기"
        onBackClick={() => console.log('navigate to main')}
      >
        <AppBar.Progress value={step} max={3} />
      </AppBar>
      <div css={containerCss}>
        <TransitionAnimation
          data-key={step.toString()}
          className={{
            normal: styles.fade,
            enter: styles['fade-enter'],
            exit: styles['fade-exit'],
          }}
        >
          <Intro key={0} onCreateClick={() => setStep(1)} />
          <Choice key={1} onSubmit={() => setStep(0)} />
        </TransitionAnimation>
      </div>
    </>
  );
};

export default CreateAvatar;
