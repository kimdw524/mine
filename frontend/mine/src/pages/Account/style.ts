import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const accountCss = css`
  flex: 1;
  overflow-y: scroll;
`;

export const menuCss = css`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem;
`;

export const bottomCss = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 0.0625rem solid #e6e6e6;
`;
