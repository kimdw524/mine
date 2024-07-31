import { css } from '@emotion/react';

export const selectCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem 0;
  background-color: white;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.1);
`;

export const selectBoxCss = css`
  min-width: 50%;
`;

export const avatarInfoBoxCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2rem);
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  row-gap: 1rem;
`;
