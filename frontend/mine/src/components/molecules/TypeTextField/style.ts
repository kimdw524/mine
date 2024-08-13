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
  width: 0;
  padding: 0.75rem 0.75rem 0.75rem 0.125rem;
  border: 0;
  background-color: transparent;
  outline: none;
`;

export const typeCss = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 0.125rem 0 0.75rem;
  height: 100%;
  border-right: 0.0625rem solid #d3d3d3;
  cursor: pointer;
  user-select: none;

  svg {
    width: 1rem;
    height: 1rem;
  }

  div > span {
    font-size: 0.875rem;
    word-break: keep-all;
  }
`;

export const voiceRecordCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
