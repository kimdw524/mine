import { css } from '@emotion/react';

export const containerCss = css`
  position: relative;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  margin-top: 8.125rem;
`;

export const navchartCss = css`
  position: fixed;
  bottom: 1.5625rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 70%;
  padding: 1rem 0;
  font-size: 1.125rem;
  border-radius: 1.25rem;
`
