import { css, Theme } from '@emotion/react';

export const containerCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: sticky;
  top: 0;
  z-index: 30;
  height: 3.5rem;
  padding: 0 1rem;
  background-color: ${theme.colors.background};
`;

export const labelCss = css`
  border: none;
`;

export const menuCss = css`
  display: flex;
  gap: 0.25rem;
  position: absolute;
  right: 1rem;
`;
