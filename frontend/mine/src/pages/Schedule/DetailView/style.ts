import { css } from '@emotion/react';
import colorPalette from 'oyc-ds/dist/themes/colorPalette';

export const modalCss = css`
  overflow-y: scroll;
  height: 100vh;
  background-color: #fff;
`;

export const containerCss = css`
  padding: 1rem;
`;

export const headCss = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const infoCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const periodCss = css`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
`;

export const descriptionCss = css`
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: ${colorPalette.deepPurple[50]};
  line-height: 150%;
  word-break: break-all;
`;

export const buttonCss = css`
  padding: 1rem 0;
  text-align: right;
`;
