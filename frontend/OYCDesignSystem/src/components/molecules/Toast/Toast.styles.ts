import { SerializedStyles, Theme, css } from '@emotion/react';
import { Palette } from '../../../themes/lightTheme';
import { ToastVariant } from './Toast.types';

const colors: Record<Palette, string> = {
  primary: '#F3E5F5',
  success: '#E3F2FD',
  danger: '#FFEBEE',
  secondary: '#EBEBEB',
  dark: '#F3E5F5',
  light: '#F3E5F5',
};

export const base = (theme: Theme) => css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: fit-content;
  max-width: calc(100% - 2rem);
  padding: 1rem 1rem;
  border-radius: 0.25rem;
`;

export const variants: Record<
  ToastVariant,
  (theme: Theme, color: Palette) => SerializedStyles
> = {
  contained: (theme: Theme, color: Palette) => css`
    background-color: ${colors[color]};
  `,
  filled: (theme: Theme, color: Palette) => css`
    background-color: ${theme.colors[color].main};
  `,
  outlined: (theme: Theme, color: Palette) => css`
    background-color: white;
    border: 1px solid ${theme.colors[color].main};
  `,
};
