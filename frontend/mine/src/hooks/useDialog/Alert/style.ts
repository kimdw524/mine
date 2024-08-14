import { css } from '@emotion/react';

export const alertCss = css`
  margin: 1rem;
  padding: 1rem;
  border: 0.0625rem solid #bbb;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0 1rem 0.0625rem #bbb;
`;

export const messageCss = css`
  min-width: 66vw;
  padding: 0.5rem 0 1rem;
  line-height: 150%;
  word-break: break-all;
`;

export const buttonContainerCss = css`
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
`;
