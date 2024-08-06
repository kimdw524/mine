/** @jsxImportSource @emotion/react */
import { Button, TextField, Typography } from 'oyc-ds';
import React, { startTransition, useRef, useState } from 'react';
import { formCss } from './style';
import { AvatarData } from '../../../apis/avatarApi';

interface InforProps {
  onSubmit: (result: Omit<AvatarData, 'avatarModel'>) => void;
}

const Infor = ({ onSubmit }: InforProps) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const residenceRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    startTransition(() => {
      if (!nameRef.current || !residenceRef.current || !jobRef.current) {
        setDisabled(true);
        return;
      }

      const name = nameRef.current.value.trim(),
        residence = residenceRef.current.value.trim(),
        job = jobRef.current.value.trim();
      setDisabled(name === '' || residence === '' || job === '');
    });
  };

  const handleSubmit = () => {
    if (!nameRef.current || !residenceRef.current || !jobRef.current) {
      return;
    }

    const name = nameRef.current.value.trim(),
      residence = residenceRef.current.value.trim(),
      job = jobRef.current.value.trim();

    onSubmit({ avatarName: name, residence, job });
  };

  return (
    <>
      <Typography color="dark" size="lg" style={{ lineHeight: '150%' }}>
        마지막으로,
        <br />
        아바타에 대한 정보를 입력해 주세요.
      </Typography>
      <div css={formCss}>
        <TextField
          ref={nameRef}
          variant="standard"
          label="이름"
          defaultValue=""
          onChange={handleChange}
        />
        <TextField
          ref={residenceRef}
          variant="standard"
          label="주소"
          defaultValue=""
          onChange={handleChange}
        />
        <TextField
          ref={jobRef}
          variant="standard"
          label="직업"
          defaultValue=""
          onChange={handleChange}
        />
      </div>
      <Button size="xl" fullWidth disabled={disabled} onClick={handleSubmit}>
        아바타 만들기
      </Button>
    </>
  );
};

export default Infor;
