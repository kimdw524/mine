import { css, Theme } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { MenuTabVariant } from './MenuTab.types';

const spacing = { sm: '0.75rem', md: '0.85rem', lg: '0.9rem', xl: '0.9rem' };
const fontSize = { sm: '0.75rem', md: '0.875rem', lg: '1rem', xl: '1.125rem' };

export const tabsCss = (variant: MenuTabVariant, border: number) => css`
  display: flex;
  position: relative;
  border-radius: ${border}rem;
  background-color: ${variant === 'contained' ? '#eee' : 'transparent'};
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #eee;
`;

export const btnCss = (
  theme: Theme,
  palette: PaletteColor,
  size: Size,
  variant: MenuTabVariant,
  isActive: boolean,
  border: number,
) => css`
  z-index: 2;
  flex: 1;
  padding: ${spacing[size]} 0.625rem;
  font-size: ${fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${variant === 'contained'
    ? palette.contrastText
    : isActive
      ? palette.main
      : '#eee'};
  cursor: pointer;
  background: none;
  border: none;
  border-radius: ${border}rem;
`;

export const activeCss = (
  activeIndex: number,
  color: PaletteColor,
  tabCount: number,
  variant: MenuTabVariant,
  border: number,
) => css`
  position: absolute;
  top: 0.3125rem;
  left: ${activeIndex * (100 / tabCount)}%;
  width: ${variant === 'contained'
    ? `calc(${100 / tabCount}% - 0.625rem)`
    : `${100 / tabCount}%`};
  height: calc(100% - 0.625rem);
  background-color: ${variant === 'contained' ? color.main : 'transparent'};
  box-shadow: ${variant === 'contained' ? '0 0.125rem 0.125rem #ccc' : 'none'};
  border-radius: ${border}rem;
  transition: all 300ms;
  transform: translateX(0.3125rem);
  border-bottom: ${variant === 'outlined' ? `2.3px solid ${color.main}` : 'none'};
  padding-bottom: ${variant === 'outlined' ? '5px' : '0'};
  ${variant === 'outlined' ? 'margin-left: -4.2px;' : ''}
`;

export const borderCss = {
  rectangle: css`
    border-radius: 0;
  `,
  rounded: (border: number) => css`
    border-radius: ${border}rem;
    div {
      border-radius: ${border}rem;
    }
  `,
};
