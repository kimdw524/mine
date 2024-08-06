/** @jsxImportSource @emotion/react */
import { Button, Typography } from 'oyc-ds';
import React from 'react';

interface SelectAvatarProps {
  onSubmit: (result: string) => void;
}

const SelectAvatar = ({ onSubmit }: SelectAvatarProps) => {
  const handleSubmit = (model: string) => {
    onSubmit(model);
  };

  return (
    <>
      <Typography color="dark">아바타 선택하기</Typography>
      <Button size="xl" onClick={() => handleSubmit('cow')}>
        Cow
      </Button>
    </>
  );
};

export default SelectAvatar;
