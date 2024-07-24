/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, genderContainerCss, instCss } from './style';
import React, { useContext, useRef, useState } from 'react';
import { SignupContext } from '..';

interface UserDataFormProps {
  onSubmit: () => void;
}

const UserDataForm = ({ onSubmit }: UserDataFormProps) => {
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const signupContext = useContext(SignupContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleNext = () => {
    signupContext.update({
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      name: nameRef.current?.value,
    });
    onSubmit();
  };

  return (
    <>
      <Typography size={'xl'} weight={'medium'} color={'dark'} css={instCss}>
        서비스 이용에 필요한
        <br />
        정보를 입력해 주세요.
      </Typography>
      <div css={formCss}>
        <TextField
          label="이메일"
          name="email"
          ref={emailRef}
          defaultValue=""
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          label="비밀번호"
          ref={passwordRef}
          defaultValue=""
          variant="outlined"
        />
        <TextField
          type="password"
          name="passwordCheck"
          label="비밀번호 확인"
          ref={passwordCheckRef}
          defaultValue=""
          variant="outlined"
        />
        <TextField
          label="이름"
          name="name"
          ref={nameRef}
          defaultValue=""
          variant="outlined"
        />
        <div css={genderContainerCss}>
          <Button
            size="md"
            color="secondary"
            onClick={() => setGender('M')}
            variant={gender === 'M' ? 'contained' : 'outlined'}
          >
            남자
          </Button>
          <Button
            size="md"
            color="secondary"
            onClick={() => setGender('F')}
            variant={gender === 'F' ? 'contained' : 'outlined'}
          >
            여자
          </Button>
        </div>
        <Button type="submit" size="lg" onClick={handleNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default UserDataForm;
