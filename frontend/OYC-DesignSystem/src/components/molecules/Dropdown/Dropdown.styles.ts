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
  min-width: 5rem;
  height: ${sizes[size].height};
  padding: 0 0.875rem;
  box-sizing: border-box;
  outline: none;
  border: 0;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 100ms ease;
  cursor: pointer;
  user-select: none;
  appearance: unset;
`;

export const icon = (open: boolean) => css`
  position: absolute;
  right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  transition: all 100ms ease;
  transform: rotateZ(${open ? '180deg' : '0'});

  path {
    fill: inherit;
  }
`;

export const variants: Record<
  DropdownVariant,
  (
    theme: Theme,
    palette: PaletteColor,
    open: boolean,
    disabled: boolean,
  ) => SerializedStyles
> = {
  contained: (
    theme: Theme,
    palette: PaletteColor,
    open: boolean,
    disabled: boolean,
  ) => css`
    color: ${palette.contrastText};
    fill: ${palette.contrastText};
    transition: all 100ms ease;

    ${disabled
      ? css`
          background-color: ${palette.disabled};
        `
      : css`
          background-color: ${palette.main};
        `}
  `,
  outlined: (
    theme: Theme,
    palette: PaletteColor,
    open: boolean,
    disabled: boolean,
  ) => css`
    background-color: ${theme.colors.background};
    transition: all 100ms ease;

    ${disabled
      ? css`
          border: 0.0625rem solid ${theme.colors.text.disabled};
          color: ${theme.colors.text.disabled};
          fill: ${theme.colors.text.disabled};
        `
      : css`
          border: 0.0625rem solid ${theme.colors.text.secondary};
          color: ${theme.colors.text.primary};
          fill: ${theme.colors.text.secondary};
        `}

    ${open &&
    css`
      border: 0.0625rem solid ${palette.main};
      fill: ${palette.main};
    `}
  `,
};

export const itemContainer = (theme: Theme, open: boolean) => css`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  left: 0;
  z-index: 20;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0.5rem 0.0125rem;
  border: 0.0625rem solid ${theme.colors.text.disabled};
  border-radius: 0.25rem;
  background-color: ${theme.colors.background};

  ${open
    ? css`
        opacity: 1;
      `
    : css`
        transform: translateY(-0.25rem);
        opacity: 0;
        pointer-events: none;
      `}
  transition: all 100ms ease;
`;
