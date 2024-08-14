/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Button, Typography } from 'oyc-ds';
import { achievementCss, instCss } from './style';
import { useNavigate } from 'react-router-dom';
import { updateAvatarAchievement } from '../../../apis/avatarApi';

const Done = () => {
  const navigate = useNavigate();
  const [isAchieved, setIsAchieved] = useState<boolean>(false);

  useEffect(() => {
    updateAvatarAchievement()
      .then((result) => {
        if (result.data) {
          setIsAchieved(true);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Typography size="xl" weight="medium" color="dark" css={instCss}>
        나만의 아바타가
        <br />
        완성되었습니다.
      </Typography>
      {isAchieved && (
        <div css={achievementCss}>아바타 생성 업적을 달성했습니다.</div>
      )}
      <Button size="xl" fullWidth onClick={() => navigate('/')}>
        홈으로 가기
      </Button>
    </>
  );
};

export default Done;
