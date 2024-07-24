/** @jsxImportSource @emotion/react */
import { Button } from 'oyc-ds';
import { Typography, TextField } from 'oyc-ds/dist/components';
import React, { useContext } from 'react';
import { textCss,fieldCss, btnCss } from './style';
import { EmailContext } from '..';

interface CertificationProps {
  onSubmit: () => void;
}

const Certification = ({onSubmit}:CertificationProps) => {
  const emailContext = useContext(EmailContext)

  return (
    <div>
      <Typography color="dark" size="lg" weight="medium" css={textCss}>
        {emailContext.info.email}로
      </Typography>
      <Typography color="dark" size="lg" weight="medium" css={textCss}>
        인증번호가 전송됐습니다.
      </Typography>
      <TextField
        color="primary"
        defaultValue=""
        label="인증번호"
        maxRows={10}
        placeholder="인증번호 입력"
        type="text"
        variant="outlined"
        css={fieldCss}
      />
      <Button color="primary" fullWidth size="lg" variant="contained" css={btnCss} onClick={onSubmit}>
        인증번호 전송하기
      </Button>
      <Button color="primary" fullWidth size="lg" variant="outlined">
        인증번호 재전송하기
      </Button>
    </div>
  );
};

export default Certification;
