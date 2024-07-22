import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 30;
  width: 100%;
  height: 4rem;

  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;

  box-shadow: 0 -0.25rem 0.25rem 0 rgba(0, 0, 0, 0.1);
`;
