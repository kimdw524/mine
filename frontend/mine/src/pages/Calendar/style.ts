import { css } from '@emotion/react';

export const modalCss = css`
  overflow-y: scroll;
  height: 100vh;
  background-color: #fff;
  outline: none !important;
`;

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const unselectedCss = css`
  padding: 0.625rem;
  border-radius: 1rem;
  color: #bbb;
  transition: all 0.2s ease;
`;

export const selectedCss = css`
  padding: 0.625rem;
  border-radius: 1rem;
  background-color: #e9c0f2;
  transition: all 0.2s ease;
`;

export const bodyCss = css`
  flex: 1;
  position: relative;
`;
