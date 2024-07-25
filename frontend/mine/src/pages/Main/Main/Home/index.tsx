/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from 'oyc-ds';
import { numberdayCss } from './style';

const Home = () => {
  return (
    <div>
      <Typography color="dark" size="xl" weight="medium" css={numberdayCss}>
        캐릭터를 
        <br />
        만난 지  1일 째
      </Typography>
    </div>
  );
};

export default Home;
