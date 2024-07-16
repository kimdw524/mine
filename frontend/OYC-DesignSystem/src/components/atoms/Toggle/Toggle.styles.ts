import { Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';

export const base = (theme: Theme, palette: PaletteColor) => css`
  position: relative;
  width: 2.125rem;
  height: 1rem;
  padding: 0.125rem 0;
  border-radius: 1rem;
  background-color: ${palette.main};
  transition: background-color 300ms;
`;

export const thumb = (value: boolean) => css`
  position: absolute;
  left: ${value ? '1rem' : '0.125rem'};
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  transition: left 300ms ease-in-out;
`;
