/** @jsxImportSource @emotion/react */
import AppBar from '../../components/organisms/AppBar';
import React, { createContext, useCallback, useState } from 'react';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import styles from './FindPassword.module.css';
import Certification from './Certification';
import ChangePassword from './ChangePassword';
import EmailInput from './EmailInput';
import { containerCss } from './style';

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
  const [step, setStep] = useState<number>(0);
  const [info, setInfo] = useState<EmailInfo>({
    email: '',
    password: '',
    code: '',
  });

  const updateInfo = useCallback((data: Partial<EmailInfo>) => {
    setInfo((info) => {
      return { ...info, ...data };
    });
  }, []);
  return (
    <EmailContext.Provider value={{ info, update: updateInfo }}>
      <AppBar
        label="비밀번호 찾기"
        onBackClick={() => console.log('to main page')}
      >
        <AppBar.Progress value={step + 1} max={3} />
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
          <EmailInput
            key={0}
            onSubmit={() => {
              setStep(1);
            }}
          />
          <Certification
            key={1}
            onSubmit={() => {
              setStep(2);
            }}
          />
          <ChangePassword key={2} />
        </TransitionAnimation>
      </div>
    </EmailContext.Provider>
  );
};

export default FindPassword;
