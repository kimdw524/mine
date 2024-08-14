/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import { formCss, genderContainerCss, instCss } from './style';
import React, { useContext, useRef, useState } from 'react';
import { SignupContext } from '..';
import { checkEmail, requestVerificationEmail } from '../../../apis/authApi';
import { useMutation } from '@tanstack/react-query';

interface UserDataFormProps {
  onSubmit: () => void;
}

const validator = {
  checkEmail: (email: string) => {
    return /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/.test(email);
  },
  checkPassword: (password: string) => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password);
  },
  checkName: (name: string) => {
    return /^[a-zA-Z가-힣]{1,10}$/.test(name);
  },
};

type FormField = 'email' | 'password' | 'passwordCheck' | 'name';

type UserDataValidation = Record<FormField, string>;

const UserDataForm = ({ onSubmit }: UserDataFormProps) => {
  const genderRef = useRef<'M' | 'F' | undefined>(undefined);
  const [available, setAvailable] = useState<boolean>(false);
  const signupContext = useContext(SignupContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCheckRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [validation, setValidation] = useState<UserDataValidation>({
    email: '',
    name: '',
    password: '',
    passwordCheck: '',
  });
  const requestEmail = useMutation({
    mutationFn: (param: { email: string }) => requestVerificationEmail(param),
    onSuccess: (data) => {
      if (data.status === 200) {
        onSubmit();
      }
    },
    onError: (error) => {
      alert('이메일을 전송하지 못했습니다.');
      console.error(error);
    },
  });

  const handleNext = () => {
    if (!validate()) {
      return;
    }

    signupContext.update({
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      name: nameRef.current?.value,
      gender: genderRef.current,
    });

    checkEmail(emailRef.current!.value).then((res) => {
      if (res.data === false) {
        requestEmail.mutate({ email: emailRef.current!.value });
        return;
      } else {
        setValidation((value) => {
          return { ...value, email: '이미 사용 중인 이메일입니다.' };
        });
        setAvailable(false);
      }
    });
  };

  const validate = (): boolean => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !passwordCheckRef.current ||
      !nameRef.current
    ) {
      return false;
    }
    const email = emailRef.current.value,
      password = passwordRef.current.value,
      passwordCheck = passwordCheckRef.current.value,
      name = nameRef.current.value;

    const result: Record<FormField, string> = {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
    };

    let flag = true;

    if (email === '') {
      result.email = '';
      flag = false;
    } else if (!validator.checkEmail(email)) {
      result.email = '이메일이 형식에 맞지 않습니다.';
      flag = false;
    } else {
      result.email = '';
    }

    if (password === '') {
      result.password = '';
      flag = false;
    } else if (!validator.checkPassword(password)) {
      result.password = '영문과 숫자를 포함하여 8자 이상이어야 합니다.';
      flag = false;
    } else {
      result.password = '';
    }

    if (passwordCheck === '') {
      result.passwordCheck = '';
      flag = false;
    } else if (password !== passwordCheck) {
      result.passwordCheck = '비밀번호가 일치하지 않습니다.';
      flag = false;
    } else {
      result.passwordCheck = '';
    }

    if (name === '') {
      result.name = '';
      flag = false;
    } else if (!validator.checkName(name)) {
      result.name = '이름은 1~10글자의 한글, 영어입니다.';
      flag = false;
    } else {
      result.name = '';
    }

    if (!genderRef.current) {
      result.name = '';
      flag = false;
    }

    setValidation(result);
    setAvailable(flag);
    return flag;
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
          color={validation.email === '' ? 'primary' : 'danger'}
          onBlur={validate}
        />
        {validation.email && (
          <Typography color="danger" size="xs">
            {validation.email}
          </Typography>
        )}
        <TextField
          type="password"
          name="password"
          label="비밀번호"
          ref={passwordRef}
          defaultValue=""
          variant="outlined"
          color={validation.password === '' ? 'primary' : 'danger'}
          onBlur={validate}
        />
        {validation.password && (
          <Typography color="danger" size="xs">
            {validation.password}
          </Typography>
        )}
        <TextField
          type="password"
          name="passwordCheck"
          label="비밀번호 확인"
          ref={passwordCheckRef}
          defaultValue=""
          variant="outlined"
          color={validation.passwordCheck === '' ? 'primary' : 'danger'}
          onBlur={validate}
        />
        {validation.passwordCheck && (
          <Typography color="danger" size="xs">
            {validation.passwordCheck}
          </Typography>
        )}
        <TextField
          label="이름"
          name="name"
          ref={nameRef}
          defaultValue=""
          variant="outlined"
          color={validation.name === '' ? 'primary' : 'danger'}
          onBlur={validate}
        />
        {validation.name && (
          <Typography color="danger" size="xs">
            {validation.name}
          </Typography>
        )}
        <div css={genderContainerCss}>
          <Button
            size="md"
            color="secondary"
            onClick={() => {
              genderRef.current = 'M';
              validate();
            }}
            variant={genderRef.current === 'M' ? 'contained' : 'outlined'}
          >
            남자
          </Button>
          <Button
            size="md"
            color="secondary"
            onClick={() => {
              genderRef.current = 'F';
              validate();
            }}
            variant={genderRef.current === 'F' ? 'contained' : 'outlined'}
          >
            여자
          </Button>
        </div>
        <Button
          type="submit"
          size="lg"
          onClick={handleNext}
          disabled={!available}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default UserDataForm;
