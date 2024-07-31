import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const chatLogCss = css`
  flex: 1;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #ddd;
`;

export const chatCss = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const bottomCss = css`
  > div {
    position: static !important;
  }
`;

export const chatTypeCss = css`
  padding: 0 0.75rem 0 0;
  border: 0 !important;
  + span {
    display: none;
  }
`;

export const chatInputCss = css`
  flex: 1;
`;
