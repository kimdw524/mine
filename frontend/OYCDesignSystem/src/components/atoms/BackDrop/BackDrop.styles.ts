import { Theme, css } from '@emotion/react';

export const base = (theme: Theme, opacity: number, blur: number) => css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, ${opacity});
  backdrop-filter: blur(${blur}px);
`;
