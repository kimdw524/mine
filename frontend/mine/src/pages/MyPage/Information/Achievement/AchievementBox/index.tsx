/** @jsxImportSource @emotion/react */
import React from 'react';
import { IAchievement } from '../AchievementFetch';
import {
  achievementBoxCss,
  achievementProgressCss,
  progressBarBoxCss,
  progressBarCss,
} from './style';
import { Typography } from 'oyc-ds';
import { css } from '@emotion/react';

interface IAchievementBox {
  info: IAchievement;
}

const AchievementBox = ({ info }: IAchievementBox) => {
  return (
    <div css={achievementBoxCss}>
      <Typography size="md">{info.achievement_title}</Typography>
      <Typography
        size="sm"
        color="dark"
        css={() => css`
          text-align: start;
        `}
      >
        {info.achievement_description}
      </Typography>
      <div css={achievementProgressCss}>
        <div css={progressBarBoxCss}>
          <div
            css={progressBarCss(
              info.achievement_required_amount,
              info.achievement_count,
            )}
          />
        </div>
        <Typography size="xs" color="dark">
          {(info.achievement_count / info.achievement_required_amount) * 100}%
        </Typography>
      </div>
    </div>
  );
};

export default AchievementBox;
