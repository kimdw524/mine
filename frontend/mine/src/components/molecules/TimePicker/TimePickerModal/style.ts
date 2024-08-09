import { css } from '@emotion/react';

export const modalCss = css`
  position: absolute;
  top: 65vh;
  width: 100vw;
  background-color: #fff;
  box-shadow: 0 -0.0625rem 1.5rem 0.125rem #888;
`;

export const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  height: 35vh;
`;

export const menuCss = css`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

export const typeCss = css`
  display: flex;
  align-items: center;
  padding: 0 0.375rem 0 0.75rem;
  height: 100%;
  cursor: pointer;
  user-select: none;

  div > span {
    padding-bottom: 0.25rem;
    border-bottom: 0.125rem solid #636363;
    font-size: 1.5rem;
    word-break: keep-all;
  }
`;
