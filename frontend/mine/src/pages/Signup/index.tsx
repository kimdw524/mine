/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { containerCss } from './style';
import AppBar from '../../components/organisms/AppBar';
import UserDataForm from './UserDataForm';
import Verification from './Verification';

const Signup = () => {
  const [step, setStep] = useState<'userDataForm' | 'verification'>(
    'userDataForm',
  );

  return (
    <>
      <AppBar label="회원가입" onBackClick={() => alert(1)} />
      <div css={containerCss}>
        {
          {
            userDataForm: (
              <UserDataForm onSubmit={() => setStep('verification')} />
            ),
            verification: (
              <Verification onSubmit={() => setStep('userDataForm')} />
            ),
          }[step]
        }
      </div>
    </>
  );
};

export default Signup;
