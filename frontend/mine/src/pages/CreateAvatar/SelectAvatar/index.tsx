/** @jsxImportSource @emotion/react */
import { Button, Typography } from 'oyc-ds';
import React, { useState } from 'react';
import { avatarCss, controlBtnCss } from './style';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Avatar3D from '../../../components/atoms/Avatar3D';

interface SelectAvatarProps {
  onSubmit: (result: string) => void;
}

const SelectAvatar = ({ onSubmit }: SelectAvatarProps) => {
  const [models, setModels] = useState<string[]>([
    'cow',
    'pig',
    'dog',
    'cat',
    'rabbit',
    'unicorn',
  ]);
  const [step, setStep] = useState<number>(0);

  const handleSubmit = (model: string) => {
    onSubmit(model);
  };

  return (
    <>
      <Typography color="dark">아바타 선택하기</Typography>
      <div css={avatarCss}>
        <Avatar3D idx={step} />
      </div>
      <div css={controlBtnCss}>
        <Button
          color="secondary"
          onClick={() => setStep((step) => step - 1)}
          disabled={step === 0}
        >
          <Typography size="sm" color="light">
            이전
          </Typography>
        </Button>
        <Button size="xl" onClick={() => handleSubmit(models[step])}>
          선택
        </Button>
        <Button
          onClick={() => {
            setStep((step) => step + 1);
          }}
          disabled={step === 5}
        >
          <Typography size="sm" color="light">
            다음
          </Typography>
        </Button>
      </div>
    </>
  );
};

export default SelectAvatar;
