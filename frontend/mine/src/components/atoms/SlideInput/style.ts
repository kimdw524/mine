import { css } from '@emotion/react';

export const containerCss = css`
  position: relative;
  overflow: hidden;
  height: 10rem;
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

export const lightCss = css`
  position: absolute;
  left: 0;
  right: 0;
  height: calc(50% - 2rem);
  background-color: rgba(255, 255, 255, 0.66);
`;
