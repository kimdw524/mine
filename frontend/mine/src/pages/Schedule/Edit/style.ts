/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const modalCss = css`
  overflow-y: scroll;
  height: 100vh;
  background-color: #fff;
`;

export const containerCss = css`
  padding: 1rem;
`;

export const periodCss = css`
  display: flex;
  padding: 1rem 0;

  > div {
    width: 50%;
  }
`;

export const bottomCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  bottom: 0;
  padding: 0.75rem;
  border-top: 0.0625rem solid #e6e6e6;
  background-color: #fff;
`;

export const leftSideCss = css`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export const rightSideCss = css`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const textContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const categoryCss = css`
  margin-bottom: 0.5rem;
`;
