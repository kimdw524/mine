import { css } from '@emotion/react';

export const containerCss = css`
  display: flex;
  height: 100%;
`;

export const kindCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35%;
  height: 100%;
`;

export const scheduleCss = css`
  width: 65%;
  height: 100%;
  overflow-y: scroll;
`;

export const titleCss = css`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const accountCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  width: 65%;
  height: 100%;
`;

export const sumCss = css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;
