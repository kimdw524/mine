import { SerializedStyles, Theme, css } from '@emotion/react';
import { TextFieldVariant } from './TextField.types';
import { PaletteColor } from '../../../themes/lightTheme';

export const base = (
  theme: Theme,
  palette: PaletteColor,
  multiLine: boolean,
) => css`
  position: relative;
  padding: 0.875rem 0.625rem;
  transition: all 150ms ease-in-out;

  ${multiLine &&
  css`
    overflow-y: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
    }
  `};
`;

export const labelField = (
  theme: Theme,
  palette: PaletteColor,
  placeholder: string,
  defaultValue: string,
  isFocused: boolean,
) => css`
  position: absolute;
  top: calc(50% - 0.5rem);
  padding: 0 0.3125rem;
  color: ${isFocused ? palette.main : '#B4B4B4'};
  font-size: ${defaultValue !== '' || placeholder !== '' || isFocused
    ? '0.625rem'
    : '1rem'};
  transition: all 150ms ease-in-out;
`;

export const inputField = (
  theme: Theme,
  disabled: boolean,
  multiLine: boolean,
) => css`
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;

  ::placeholder {
    color: #999999;
  }

  ${disabled &&
  css`
    background-color: white;
  `}

  ${multiLine &&
  css`
    overflow-y: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
    }
  `}
`;

export const variants: Record<
  TextFieldVariant,
  (theme: Theme, palette: PaletteColor, isFocused: boolean) => SerializedStyles
> = {
  contained: (theme: Theme, palette: PaletteColor, isFocused: boolean) => css`
    padding-bottom: 0;
    border-bottom: calc(0.0625rem * 1.5) ${isFocused ? palette.main : '#D5D5D5'}
      solid;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
    background-color: #e8e8e8;
  `,
  outlined: (theme: Theme, palette: PaletteColor, isFocused: boolean) => css`
    border: calc(0.0625rem * 1.5) ${isFocused ? palette.main : '#D5D5D5'} solid;
    border-radius: 0.3125rem;
  `,
  standard: (theme: Theme, palette: PaletteColor, isFocused: boolean) => css`
    padding-bottom: 0;
    padding-left: 0;
    border-bottom: calc(0.0625rem * 1.5) ${isFocused ? palette.main : '#D5D5D5'}
      solid;
    border-top-left-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
  `,
};

export const labelVariants: Record<
  TextFieldVariant,
  (
    theme: Theme,
    palette: PaletteColor,
    placeholder: string,
    defaultValue: string,
    isFocused: boolean,
  ) => SerializedStyles
> = {
  contained: (
    theme: Theme,
    palette: PaletteColor,
    placeholder: string,
    defaultValue: string,
    isFocused: boolean,
  ) => css`
    ${(defaultValue !== '' || placeholder !== '' || isFocused) &&
    css`
      top: 0.5rem;
    `};
  `,
  outlined: (
    theme: Theme,
    palette: PaletteColor,
    placeholder: string,
    defaultValue: string,
    isFocused: boolean,
  ) => css`
    ${(defaultValue !== '' || placeholder !== '' || isFocused) &&
    css`
      top: -0.375rem;
      background-color: white;
    `};
  `,
  standard: (
    theme: Theme,
    palette: PaletteColor,
    placeholder: string,
    defaultValue: string,
    isFocused: boolean,
  ) => css`
    ${(defaultValue !== '' || placeholder !== '' || isFocused) &&
    css`
      top: 0.5rem;
    `};
  `,
};

export const inputVariants: Record<
  TextFieldVariant,
  (theme: Theme, palette: PaletteColor) => SerializedStyles
> = {
  contained: (theme: Theme, palette: PaletteColor) => css`
    margin: 1rem 0 0.25rem 0;
    background-color: #e8e8e8;
  `,
  outlined: (theme: Theme, palette: PaletteColor) => css``,
  standard: (theme: Theme, palette: PaletteColor) => css`
    margin: 1rem 0 0.25rem 0;
  `,
};
