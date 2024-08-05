import { css } from '@emotion/react';
import { LightTheme } from 'oyc-ds';

export const containerCss = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow: hidden;
  width: 100%;
  border: 0.09375rem solid #d5d5d5;
  border-radius: 0.3125rem;
  background-color: #fff;
  transition: all 0.2s ease;
`;

export const focusCss = css`
  border: 0.09375rem solid ${LightTheme.colors.primary.main};
`;

export const textCss = css`
  flex: 1;
  padding: 0.75rem 0.75rem 0.75rem 0.125rem;
  border: 0;
  background-color: transparent;
  outline: none;
`;

export const typeCss = css`
  flex-shrink: 0;
  padding: 0 0.375rem 0 0.75rem;
  height: 100%;
  border-right: 0.0625rem solid #d3d3d3;
  cursor: pointer;
  user-select: none;

  div > span {
    font-size: 0.875rem;
    word-break: keep-all;
  }
`;
