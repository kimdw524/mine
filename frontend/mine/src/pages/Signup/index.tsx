/** @jsxImportSource @emotion/react */
import React, { createContext, useState } from 'react';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import AppBar from '../../components/organisms/AppBar';
import Done from './Done';
import styles from './Signup.module.css';
import UserDataForm from './UserDataForm';
import Verification from './Verification';
import { containerCss } from './style';
import { useNavigate } from 'react-router-dom';

interface SignupInfo {
  email: string;
  password: string;
  name: string;
  gender: 'M' | 'F';
  code: string;
}

interface SignupContextProps {
  info: SignupInfo;
  update: (data: Partial<SignupInfo>) => void;
}

export const SignupContext = createContext<SignupContextProps>(
  {} as SignupContextProps,
);

const Signup = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<SignupInfo>({
    email: '',
    password: '',
    name: '',
    gender: 'M',
    code: '',
  });
  const [step, setStep] = useState<number>(0);

  const updateInfo = (data: Partial<SignupInfo>) => {
    setInfo((info) => {
      return { ...info, ...data };
    });
  };

  return (
    <SignupContext.Provider value={{ info, update: updateInfo }}>
      <AppBar label="회원가입" onBackClick={() => navigate(-1)}>
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
          <UserDataForm key={0} onSubmit={() => setStep(1)} />
          <Verification key={1} onSubmit={() => setStep(2)} />
          <Done key={2} />
        </TransitionAnimation>
      </div>
    </SignupContext.Provider>
  );
};

export default Signup;
