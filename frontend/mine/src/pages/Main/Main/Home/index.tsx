/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Typography } from 'oyc-ds';
import { numberdayCss, toggleCss, toggleContainerCss } from './style';
import { Toggle } from 'oyc-ds';

const Home = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  return (
    <div>
      <Typography color="dark" size="xl" weight="medium" css={numberdayCss}>
        캐릭터를
        <br />
        만난 지 1일 째
      </Typography>
      <div css={toggleContainerCss}>
        <Typography color="dark" size="md" weight="medium">
          {isOn ? "음성 켜기" : "음성 끄기"}
        </Typography>
        <Toggle
          color="primary"
          size="md"
          onClick={() => (isOn ? setIsOn(false) : setIsOn(true))}
          css={toggleCss}
        />
      </div>
    </div>
  );
};

export default Home;
