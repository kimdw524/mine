import { SerializedStyles, Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { MenuTabVariant } from './MenuTab.types';

const spacing = {
  sm: '0.75rem',
  md: '0.85rem',
  lg: '0.9rem',
  xl: '0.9rem',
};

const fontSize = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.125rem',
}

export const tabsCss = css`
  display: flex;
  position: relative;
  border-radius: 0.625rem;
  background-color: #eee;
  align-items: center;
  justify-content: center;
`;

export const btnCss = (theme: Theme, tabCount: number, size: Size) => css`
  z-index: 2;
  width: ${100 / tabCount}%;
  padding: ${spacing[size]} 0.625rem;
  background: none;
  border: none;
  font-size: ${fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
`;

export const activeCss = (activeIndex: number, color: PaletteColor, tabCount: number) => css`
  position: absolute;
  top: 0.3125rem;
  left: ${activeIndex * (100 / tabCount)}%;
  width: calc(${100 / tabCount}% - 0.625rem);
  height: calc(100% - 0.625rem);
  box-shadow: 0 0.125rem 0.125rem #ccc;
  background-color: ${color.main};
  border-radius: inherit;
  transition: all 300ms;
  transform: translateX(0.3125rem);
`;

export const variantCss: Record<MenuTabVariant, SerializedStyles> = {
  rectangle: css`
    border-radius: 0;
  `,
  rounded: css`
    border-radius: 0.25rem;

    div {
      border-radius: 0.25rem;
    }
  `,
};