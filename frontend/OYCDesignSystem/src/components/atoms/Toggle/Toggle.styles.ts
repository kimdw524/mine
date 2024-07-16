import { Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

const toggleSize: Record<Size, { width: string }> = {
  sm: { width: '2rem' },
  md: { width: '2.25rem' },
  lg: { width: '2.5rem' },
  xl: { width: '2.75rem' },
};

export const base = (theme: Theme, palette: PaletteColor, size: Size) => css`
  position: relative;
  width: ${toggleSize[size].width};
  height: 1rem;
  padding: 0.125rem 0;
  border-radius: 1rem;
  background-color: ${palette.main};
  transition: background-color 300ms;
`;

export const thumb = (value: boolean, size: Size) => css`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  transition: left 300ms ease-in-out;

  ${value
    ? css`
        left: calc(${toggleSize[size].width} - 1.125rem);
      `
    : css`
        left: 0.125rem;
      `}
`;
