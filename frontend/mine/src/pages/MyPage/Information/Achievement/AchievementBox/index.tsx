/** @jsxImportSource @emotion/react */
import React from 'react';
import { IAchievement } from '../AchievementFetch';
import {
  achievementBoxCss,
  achievementProgressCss,
  progressBackgroundCss,
  progressBarBoxCss,
} from './style';
import { Typography } from 'oyc-ds';

interface IAchievementBox {
  info: IAchievement;
}

const AchievementBox = ({ info }: IAchievementBox) => {
  return (
    <div css={achievementBoxCss}>
      <Typography size="md">{info.achievement_title}</Typography>
      <Typography size="sm" color="dark">
        {info.achievement_description}
      </Typography>
      <div css={achievementProgressCss}>
        <div css={progressBarBoxCss}>
          <div css={progressBackgroundCss}></div>
        </div>
        <div>
          {(info.achievement_count / info.achievement_required_amount) * 100}%
        </div>
      </div>
    </div>
  );
};

export default AchievementBox;
