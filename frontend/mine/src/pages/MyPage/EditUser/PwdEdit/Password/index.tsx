/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import React, { useCallback, useState } from 'react';
import { pwdVerificationCss } from './style';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { changePwd } from '../../../../../api/myPageApi';
import { useNavigate } from 'react-router-dom';

const Password = () => {
  const nav = useNavigate();
  const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
  const [color, setColor] = useState<Palette>('primary');
  const [pwd, setPwd] = useState<string>('');

  const handleInputPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPwd(e.target.value);
    },
    [],
  );
  const pwdValidation = useCallback(async () => {
    if (pwd.length === 0 || !pwdCheck.test(pwd)) setColor('danger');
    else setColor('success');
  }, [pwd]);

  return (
    <>
      <div css={pwdVerificationCss}>
        <Typography size={'xl'} weight={'medium'} color={'dark'}>
          비밀번호를 입력해주세요
        </Typography>
        <div style={{ marginTop: '1rem' }}></div>
        <TextField
          variant="outlined"
          color={color}
          label="비밀번호를 입력해주세요"
          placeholder="소문자, 숫자 8자 이상"
          defaultValue=""
          onChange={handleInputPwd}
          onKeyUp={pwdValidation}
        />
        <Button
          disabled={!(color === 'success')}
          onClick={async () => {
            await changePwd(pwd);
            // info 띄우기
            nav('/mypage');
          }}
        >
          변경
        </Button>
      </div>
    </>
  );
};

export default Password;
