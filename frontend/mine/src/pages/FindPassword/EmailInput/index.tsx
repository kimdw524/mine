/** @jsxImportSource @emotion/react */
import { Button } from 'oyc-ds';
import { Typography, TextField } from 'oyc-ds/dist/components';
import React, { useRef, useContext } from 'react';
import { fieldCss, textCss, btnCss } from './style';
import { EmailContext } from '..';

interface EmailInputProps {
  onSubmit: () => void;
}

const EmailInput = ({ onSubmit }: EmailInputProps) => {
  const emailContext = useContext(EmailContext)
  const emailRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    emailContext.update({
      email: emailRef.current?.value,
    });
    onSubmit();
  };

  return (
    <>
      <Typography color="dark" size="lg" weight="medium" css={textCss}>
        인증번호 전송을 위해
      </Typography>
      <Typography color="dark" size="lg" weight="medium" css={textCss}>
        가입하신 이메일을 입력해주세요.
      </Typography>
      <TextField
        color="primary"
        defaultValue=""
        label="이메일 주소"
        maxRows={10}
        placeholder="abc@mail.com"
        type="text"
        variant="outlined"
        css={fieldCss}
        ref={emailRef}
      />
      <Button
        color="primary"
        fullWidth
        size="lg"
        variant="contained"
        css={btnCss}
        onClick={handleNext}
      >
        인증번호 전송하기
      </Button>
    </>
  );
};

export default EmailInput;
