import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 30;
  width: 100%;
  height: 4rem;
  min-height: 4rem;
  box-shadow: 0 -0.25rem 0.25rem 0 rgba(0, 0, 0, 0.1);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: white;
`;

export const menuBoxCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`;
