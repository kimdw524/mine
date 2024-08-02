/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import React, { useCallback, useContext, useState } from 'react';
import {
  emailInputCss,
  emailVerificationCss,
  codeInputCss,
  nextStepBtnCss,
} from './style';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { sendCode, verifyCode } from '../../../../../apis/mypageApi';
import { NotificationContext } from '../../../../../utils/NotificationContext';

interface EmailVerificationProps {
  nextStep: () => void;
}

const EmailVerification = ({ nextStep }: EmailVerificationProps) => {
  const notificationContext = useContext(NotificationContext);
  const emailCheck = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-za-z0-9-]+/;
  const [emailColor, setEmailColor] = useState<Palette>('primary');
  const [email, setEmail] = useState<string>('');
  const [codeColor, setCodeColor] = useState<Palette>('primary');
  const [code, setCode] = useState<string>('');
  const [step, setStep] = useState<number>(0);

  /* 이메일 입력 */
  const handleInputEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );
  const emailValidation = useCallback(async () => {
    if (email.length === 0 || !emailCheck.test(email)) setEmailColor('danger');
    else setEmailColor('success');
  }, [email]);

  /* 인증번호 입력 */
  const handleInputCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCode(e.target.value);
    },
    [],
  );
  const codeValidation = useCallback(async () => {
    if (code.length !== 6) setCodeColor('danger');
    else setCodeColor('success');
  }, [code]);

  return (
    <>
      <div css={emailVerificationCss}>
        <Typography size={'xl'} weight={'medium'} color={'dark'}>
          이메일을 입력해주세요
        </Typography>
        <div css={emailInputCss}>
          <div style={{ flex: '1' }}>
            <TextField
              variant="outlined"
              color={emailColor}
              label="이메일을 입력해주세요"
              placeholder="abc@abc.com"
              defaultValue=""
              onChange={handleInputEmail}
              onKeyUp={emailValidation}
            />
          </div>
          <Button
            size="md"
            disabled={!(emailColor === 'success')}
            onClick={async () => {
              await sendCode(email)
                .then(() => setStep(1))
                .catch(() => {
                  notificationContext.handle(
                    'contained',
                    'danger',
                    '존재하지 않는 이메일입니다',
                  );
                });
            }}
          >
            전송
          </Button>
        </div>
        <div css={codeInputCss(step)}>
          <div style={{ flex: '1' }}>
            <TextField
              variant="outlined"
              color={codeColor}
              label="인증번호를 입력해주세요"
              placeholder="xxxxxx"
              defaultValue=""
              onChange={handleInputCode}
              onKeyUp={codeValidation}
            />
          </div>
          <Button
            size="md"
            disabled={!(codeColor === 'success')}
            onClick={async () => {
              await verifyCode(email, code)
                .then(() => setStep(2))
                .catch(() => {
                  notificationContext.handle(
                    'contained',
                    'danger',
                    '인증번호가 틀렸습니다',
                  );
                });
            }}
          >
            인증
          </Button>
        </div>
        <Button css={nextStepBtnCss(step)} onClick={() => nextStep()}>
          다음
        </Button>
      </div>
    </>
  );
};

export default EmailVerification;
