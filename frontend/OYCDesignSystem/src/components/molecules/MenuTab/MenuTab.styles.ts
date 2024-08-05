import { SerializedStyles, Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { MenuTabBorder, MenuTabVariant } from './MenuTab.types';

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
};

export const tabsCss = (variant: MenuTabVariant, border: MenuTabBorder) => css`
  display: flex;
  position: relative;
  border-radius: ${border === 'rectangle' ? '0' : '0.625rem'};
  background-color: ${variant === 'contained' ? '#eee' : 'transparent'};
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #eee;
`;

export const btnCss = (
  theme: Theme,
  palette: PaletteColor,
  tabCount: number,
  size: Size,
  variant: MenuTabVariant,
  isActive: boolean,
  border: MenuTabBorder
) => css`
  z-index: 2;
  width: ${100 / tabCount}%;
  padding: ${spacing[size]} 0.625rem;
  background: none;
  border: none;
  font-size: ${fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${variant === 'contained'
    ? palette.contrastText
    : isActive
    ? palette.main
    : '#eee'};
  cursor: pointer;
  border-bottom: ${variant === 'outlined' && !isActive ? 'none' : 'none'};
  border-radius: ${border === 'rectangle' ? '0' : 'inherit'};
`;

export const activeCss = (
  activeIndex: number,
  color: PaletteColor,
  tabCount: number,
  variant: MenuTabVariant,
  border: MenuTabBorder
) => css`
  position: absolute;
  top: 0.3125rem;
  left: ${activeIndex * (100 / tabCount)}%;
  width: calc(${100 / tabCount}% - 0.625rem);
  height: calc(100% - 0.625rem);
  background-color: ${variant === 'contained' ? color.main : 'transparent'};
  box-shadow: ${variant === 'contained' ? '0 0.125rem 0.125rem #ccc' : 'none'};
  padding-bottom: ${variant === 'contained' ? 'none' : '0.32rem'};
  border-radius: ${border === 'rectangle' ? '0' : 'inherit'};
  transition: all 300ms;
  transform: translateX(0.3125rem);
  border-bottom: ${variant === 'outlined' ? `2px solid ${color.main}` : 'none'};
`;

export const borderCss: Record<MenuTabBorder, SerializedStyles> = {
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
