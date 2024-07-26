import { css, useTheme } from '@emotion/react';
import { Palette, PaletteColor } from 'oyc-ds/dist/themes/lightTheme';

export const achievementBoxCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  row-gap: 1rem;
  width: calc(100% - 2rem);
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
`;

export const achievementProgressCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const progressBarBoxCss = css`
  width: 100%;
  height: 0.25rem;
  border-radius: 50%;
`;

export const progressBackgroundCss = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f1f3f5;
`;

export const progressBarCss = (required_amount: number, count: number) => {
  css`
    position: absolute;
    width: ${required_amount / count}%;
    height: 100%;
    background-color: #aa00ff;
  `;
};
