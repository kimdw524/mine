/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, instCss, authCss } from './style';
import React, { useContext, useRef } from 'react';
import { SignupContext } from '..';
import { useMutation } from '@tanstack/react-query';
import {
  SignupParam,
  requestVerificationEmail,
  signup,
  verifyEmailCode,
} from '../../../apis/authApi';
import useDialog from '../../../hooks/useDialog';

interface VerificationProps {
  onSubmit: () => void;
}

const Verification = ({ onSubmit }: VerificationProps) => {
  const signupContext = useContext(SignupContext);
  const numberRef = useRef<HTMLInputElement>(null);
  const { alert } = useDialog();

  const requestSignup = useMutation({
    mutationFn: (param: SignupParam) => signup(param),
    onSuccess: (data) => {
      if (data.status === 200) {
        onSubmit();
      }
    },
    onError: (error) => {
      alert('회원가입에 실패하였습니다.');
      console.error(error);
    },
  });

  const verifyEmail = useMutation({
    mutationFn: (param: { email: string; number: string }) =>
      verifyEmailCode(param),
    onSuccess: (data) => {
      if (data.status === 200) {
        requestSignup.mutate({
          email: signupContext.info.email,
          password: signupContext.info.password,
          nickname: signupContext.info.name,
          gender: signupContext.info.gender,
        });
      }
    },
    onError: (error) => {
      alert('인증번호가 일치하지 않습니다.');
      console.error(error);
    },
  });

  const requestEmail = useMutation({
    mutationFn: (param: { email: string }) => requestVerificationEmail(param),
    onSuccess: (data) => {
      if (data.status === 200) {
        alert('이메일을 다시 전송하였습니다.');
      }
    },
    onError: (error) => {
      alert('이메일을 전송하지 못했습니다.');
      console.error(error);
    },
  });

  const handleReSend = () => {
    requestEmail.mutate({ email: signupContext.info.email });
  };

  const handleNext = () => {
    verifyEmail.mutate({
      email: signupContext.info.email,
      number: numberRef.current!.value,
    });
  };

  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        {signupContext.info.email} 으로
        <br />
        인증번호를 보냈어요.
      </Typography>
      <div css={formCss}>
        <div css={authCss}>
          <div style={{ flex: '1' }}>
            <TextField
              ref={numberRef}
              label="인증번호"
              defaultValue=""
              variant="outlined"
            />
          </div>
          <Button size="sm" color="secondary" onClick={handleReSend}>
            재전송
          </Button>
        </div>
        <Button size="lg" onClick={handleNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default Verification;
