/** @jsxImportSource @emotion/react */
import { Button, Spinner, TextField, Typography } from 'oyc-ds';
import React, { startTransition, useRef, useState } from 'react';
import { buttonContainer, formCss, loadingCss } from './style';
import { AvatarData } from '../../../apis/avatarApi';

interface InforProps {
  onBack: () => void;
  onSubmit: (result: Omit<AvatarData, 'avatarModel'>) => Promise<void>;
}

const Infor = ({ onBack, onSubmit }: InforProps) => {
  const [isPending, setIsPeding] = useState<boolean>(false);
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

  const handleSubmit = async () => {
    if (!nameRef.current || !residenceRef.current || !jobRef.current) {
      return;
    }

    const name = nameRef.current.value.trim(),
      residence = residenceRef.current.value.trim(),
      job = jobRef.current.value.trim();

    setIsPeding(false);
    await onSubmit({ avatarName: name, residence, job });
    setIsPeding(true);
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
      <div css={buttonContainer}>
        <Button color="secondary" onClick={onBack}>
          이전
        </Button>
        <Button disabled={disabled} onClick={handleSubmit}>
          아바타 만들기
        </Button>
      </div>
      {isPending && (
        <div css={loadingCss}>
          <Spinner size="sm" />
        </div>
      )}
    </>
  );
};

export default Infor;
