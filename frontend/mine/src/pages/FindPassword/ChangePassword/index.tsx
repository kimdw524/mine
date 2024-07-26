/** @jsxImportSource @emotion/react */
import { Button } from 'oyc-ds';
import { Typography, TextField } from 'oyc-ds/dist/components';
import React from 'react';
import { btnCss, fieldCss, textCss } from './style';

const ChangePassword = () => {
  return (
    <div>
      <Typography color="dark" size="xl" weight="medium" css={textCss}>
        비밀번호 재설정
      </Typography>
      <Typography color="dark" size="lg" weight="medium" css={textCss}>
        새로운 비밀번호를 입력해주세요.
      </Typography>
      <TextField
        color="primary"
        defaultValue=""
        label="새 비밀번호"
        maxRows={10}
        placeholder="영문, 숫자 포함 8글자 이상"
        type="text"
        variant="outlined"
        css={fieldCss}
      />
      <TextField
        color="primary"
        defaultValue=""
        label="새 비밀번호 확인"
        maxRows={10}
        placeholder="영문, 숫자 포함 8글자 이상"
        type="text"
        variant="outlined"
        css={fieldCss}
      />
      <Button color="primary" fullWidth size="lg" variant="contained" css={btnCss}>
        비밀번호 변경하기
      </Button>
    </div>
  );
};

export default ChangePassword;
