import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const scheduleCss = css`
  flex: 1;
  overflow-y: scroll;
`;

export const headerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.25rem 1rem;
  background-color: #fff;
`;

export const bottomCss = css`
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 0.0625rem solid #e6e6e6;
`;
