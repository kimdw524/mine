/** @jsxImportSource @emotion/react */
import React, { createContext, useState } from 'react';
import { containerCss } from './style';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import styles from './FindPassword.module.css';
import AppBar from '../../components/organisms/AppBar';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import EmailVerification from './EmailInput';
import { useNavigate } from 'react-router-dom';
import Password from '../Main/MypageV2/EditUser/PwdEdit/Password';

interface EmailInfo {
  email: string;
  password: string;
  code: string;
}

interface EmailContextProps {
  info: EmailInfo;
  update: (data: Partial<EmailInfo>) => void;
}

export const EmailContext = createContext<EmailContextProps>(
  {} as EmailContextProps,
);

const FindPassword = () => {
  useLoginCheck();
  const [step, setStep] = useState<number>(0);
  const nav = useNavigate();

  return (
    <div>
      <AppBar label="비밀번호 찾기" onBackClick={() => nav('/')}>
        <AppBar.Progress value={step + 1} max={2} />
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
          <EmailVerification key={0} nextStep={() => setStep(1)} />
          <Password key={1} />
        </TransitionAnimation>
      </div>
    </div>
  );
};

export default FindPassword;
