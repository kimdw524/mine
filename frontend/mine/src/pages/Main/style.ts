import { css } from '@emotion/react';

export const containerCss = (curMenu: number) => css`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${curMenu === 1 &&
  css`
    background-color: #fffcb1;
  `}
`;

export const contentCss = css`
  flex: 1;
  overflow-y: scroll;
`;
