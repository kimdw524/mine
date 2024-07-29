import { css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';

export const tabsCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  border-radius: 10px;
  position: relative;
`;

export const btnCss = (tabCount: number) => css`
  width: ${100 / tabCount}%;
  background: none;
  border: none;
  padding: 0.625rem;
  cursor: pointer;
  z-index: 2;
`;

export const activeCss = (activeIndex: number, color: PaletteColor, tabCount: number) => css`
  background: ${color.main};
  height: calc(100% - 0.625rem);
  width: calc(${100 / tabCount}% - 0.625rem);
  position: absolute;
  top: 5px;
  left: ${activeIndex * (100 / tabCount)}%;
  transform: translateX(5px);
  border-radius: inherit;
  box-shadow: 0 2px 2px #ccc;
  transition: all 300ms;
`;
