import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const chatLogCss = css`
  flex: 1;
  overflow-y: scroll;
  border-top: 0.0625rem solid #eee;
  border-bottom: 0.0625rem solid #ddd;
`;

export const chatCss = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
