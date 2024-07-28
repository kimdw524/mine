import { css } from '@emotion/react';

export const achievementBoxCss = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 0.5rem;
  width: calc(100% - 2rem);
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: white;
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.04);
`;

export const achievementProgressCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const progressBarBoxCss = css`
  position: relative;
  width: 80%;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #f1f3f5;
`;

export const progressBarCss = (required_amount: number, count: number) => css`
  position: absolute;
  width: ${(count / required_amount) * 100}%;
  height: 0.25rem;
  border-radius: 0.125rem;
  background-color: #aa00ff;
`;
