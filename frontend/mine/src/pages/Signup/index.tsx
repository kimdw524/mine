/** @jsxImportSource @emotion/react */
import React, { createContext, useCallback, useState } from 'react';
import { containerCss } from './style';
import AppBar from '../../components/organisms/AppBar';
import UserDataForm from './UserDataForm';
import Verification from './Verification';
import Done from './Done';

interface SignupInfo {
  email: string;
  password: string;
  name: string;
  gender: 'M' | 'F';
  code: string;
}

export const SignupContext = createContext<{
  info: SignupInfo;
  update: (data: Partial<SignupInfo>) => void;
}>({} as any);

const Signup = () => {
  const [info, setInfo] = useState<SignupInfo>({
    email: '',
    password: '',
    name: '',
    gender: 'M',
    code: '',
  });
  const [step, setStep] = useState<number>(0);

  const updateInfo = useCallback((data: Partial<SignupInfo>) => {
    setInfo((info) => {
      return { ...info, ...data };
    });
  }, []);

  return (
    <SignupContext.Provider value={{ info, update: updateInfo }}>
      <AppBar
        label="회원가입"
        onBackClick={() => console.log('navigate to main')}
      >
        <AppBar.Progress value={step + 1} max={3} />
      </AppBar>
      <div css={containerCss}>
        {
          {
            0: <UserDataForm onSubmit={() => setStep(1)} />,
            1: <Verification onSubmit={() => setStep(2)} />,
            2: <Done />,
          }[step]
        }
      </div>
    </SignupContext.Provider>
  );
};

export default Signup;
