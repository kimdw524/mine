import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  user-select: none;

  > span {
    word-break: keep-all;
  }
`;
