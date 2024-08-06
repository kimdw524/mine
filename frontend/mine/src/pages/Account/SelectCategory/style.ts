import { css } from '@emotion/react';

export const modalCss = css`
  position: absolute;
  top: 50vh;
  width: 100vw;
  height: 50vh;
  min-height: 20rem;
  background-color: #fff;
  box-shadow: 0 -0.0625rem 1.5rem 0.125rem #888;
`;

export const containerCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const headerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0;
  padding-bottom: 0.5rem;
  background-color: #fff;
`;

export const categoryCss = css`
  flex: 1;
  overflow-y: scroll;
`;
