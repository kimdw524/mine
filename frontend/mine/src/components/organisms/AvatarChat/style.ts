import { css } from '@emotion/react';

export const containerCss = css`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const chatCss = css`
  input {
    background-color: transparent;
  }
`;

export const waitCss = css`
  font-size: 0.875rem;
  text-align: center;
`;

export const speechCss = css`
  display: block;
  margin-bottom: 0.25rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const responseContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const responseCss = css`
  overflow-y: scroll;
  word-break: break-all;
  max-height: 3rem;
`;
