/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, instCss, authCss } from './style';
import React, { useContext } from 'react';
import { SignupContext } from '..';

interface VerificationProps {
  onSubmit: () => void;
}

const Verification = ({ onSubmit }: VerificationProps) => {
  const signupContext = useContext(SignupContext);

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
            <TextField label="인증번호" defaultValue="" variant="outlined" />
          </div>
          <Button size="sm" color="secondary">
            재전송
          </Button>
        </div>
        <Button size="lg" onClick={onSubmit}>
          다음
        </Button>
      </div>
    </>
  );
};

export default Verification;
