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
  width: 2.25rem;
  margin: 0 auto;
  padding: 0 0;
  border-radius: 50%;
  font-weight: 500;
  font-size: 0.875rem;
  aspect-ratio: 1 / 1;
`;

export const selectedCss = css`
  background-color: #e9d5ff;
  box-shadow: 0 0 0.5rem 0 #e9d5ff;
`;

export const scheduledCss = css`
  position: absolute;
  width: 1.25rem;
  height: 0.1875rem;
  bottom: 0.5rem;
  background-color: #e1bfef;
  border-radius: 0.5rem;
`;
