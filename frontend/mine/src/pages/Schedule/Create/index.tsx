/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../../components/organisms/AppBar';
import { containerCss, periodCss } from './style';
import { TextField } from 'oyc-ds';
import Period from '../../../components/organisms/Period';

const Create = () => {
  return (
    <>
      <AppBar label="일정 추가" />
      <div css={containerCss}>
        <TextField variant="outlined" label="제목" defaultValue=""></TextField>
        <div css={periodCss}>
          <Period from={new Date()} />
        </div>
      </div>
    </>
  );
};

export default Create;
