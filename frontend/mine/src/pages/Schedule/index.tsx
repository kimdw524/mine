/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'oyc-ds';
import { css } from '@emotion/react';

const 삭제해야됨 = css`
  > div {
    box-sizing: border-box;
  }
`;

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar label="회원가입" onBackClick={() => navigate('/')} />
      <div css={삭제해야됨}>
        <Calendar />
      </div>
    </>
  );
};

export default Schedule;
