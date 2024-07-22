import { SerializedStyles, Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { DropdownVariant } from './Dropdown.types';

const sizes: Record<Size, { height: string }> = {
  sm: { height: '2.5rem' },
  md: { height: '2.75rem' },
  lg: { height: '3rem' },
  xl: { height: '3.375rem' },
};

export const base = (theme: Theme, size: Size) => css`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: ${sizes[size].height};
  padding: 0 2.125rem 0 0.875rem;
  box-sizing: border-box;
  outline: none;
  border: 0;
  border-radius: 0.25rem;
  font-size: ${theme.typography.fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 100ms ease;
  cursor: pointer;
  user-select: none;
  appearance: unset;
`;

export const containerCss = css`
  position: relative;
`;

export const iconCss = (open: boolean) => css`
  position: absolute;
  top: calc(50% - 0.625rem);
  right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  pointer-events: none;

  path {
    fill: inherit;
  }
`;

export const variants: Record<
  DropdownVariant,
  (theme: Theme, palette: PaletteColor) => SerializedStyles
> = {
  contained: (theme: Theme, palette: PaletteColor) => css`
    color: ${palette.contrastText};
    background-color: ${palette.disabled};
    fill: ${palette.contrastText};
    transition: all 100ms ease;

    :disabled {
      background-color: ${palette.main};
    }
  `,
  outlined: (theme: Theme, palette: PaletteColor) => css`
    border: 0.0625rem solid ${theme.colors.text.secondary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    fill: ${theme.colors.text.secondary};
    transition: all 200ms ease;

    :focus {
      border: 0.0625rem solid ${palette.main};
      fill: ${palette.main};
    }

    :disabled {
      border: 0.0625rem solid ${theme.colors.text.disabled};
      color: ${theme.colors.text.disabled};
      fill: ${theme.colors.text.disabled};
    }
  `,
};
