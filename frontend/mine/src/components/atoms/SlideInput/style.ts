import { css } from '@emotion/react';

export const containerCss = css`
  overflow: hidden;
  height: 10rem;
  background-color: #aaa;
`;

export const slideCss = css`
  margin-top: -5rem;
  transform: translateY(var(--y));
`;

export const itemCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 4rem;
  font-size: 1.25rem;
  text-align: center;
`;
