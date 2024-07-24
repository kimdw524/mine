/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { contentCss, pwdEditContainerCss } from './style';
import AppBar from '../../../../components/organisms/AppBar';
import styles from './PwdEdit.module.css';
import TransitionAnimation from '../../../../components/common/TransitionAnimation';
import EmailVerification from './EmailVerification';
import Password from './Password';

const PwdEdit = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <>
      <div css={pwdEditContainerCss}>
        <AppBar
          label="비밀번호 변경"
          onBackClick={() => console.log('to main page')}
        >
          <AppBar.Progress value={step + 1} max={2} />
        </AppBar>
        <div css={contentCss}>
          <TransitionAnimation
            data-key={step.toString()}
            className={{
              normal: styles.fade,
              enter: styles['fade-enter'],
              exit: styles['fade-exit'],
            }}
          >
            <EmailVerification key={0} nextStep={() => setStep(1)} />
            <Password key={1} />
          </TransitionAnimation>
        </div>
      </div>
    </>
  );
};

export default PwdEdit;
