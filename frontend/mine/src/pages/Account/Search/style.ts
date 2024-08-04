/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const modalCss = css`
  overflow-y: scroll;
  height: 100vh;
  background-color: #fff;
`;

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const searchCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1rem 0.5rem 1rem;
`;

export const resultCss = css`
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 0.5rem;
`;
