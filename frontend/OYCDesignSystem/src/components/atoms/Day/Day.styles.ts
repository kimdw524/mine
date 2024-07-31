import { css } from '@emotion/react';

export const containerCss = css`
  padding: 0 0;
  .selected {
    color: red;
  }
`;

export const textCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  width: 2.25rem;
  margin: 0 auto;
  padding: 0 0;
  aspect-ratio: 1 / 1;

  > span {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

export const circleCss = css`
  position: absolute;
  z-index: -10;
  width: 2.25rem;
  margin: 0 auto;
  padding: 0 0;
  border-radius: 50%;
  aspect-ratio: 1 / 1;

  background-color: transparent;
  transform: scale(0.5);
  transition: all 200ms ease;
`;

export const selectedCss = css`
  background-color: #ecedf2;
  transform: scale(1);
`;

export const scheduledCss = css`
  position: absolute;
  width: 1.25rem;
  height: 0.125rem;
  bottom: 0.375rem;
  background-color: #b771ff;
  border-radius: 0.5rem;
`;
