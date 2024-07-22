import { SerializedStyles, Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { ProgressVariant } from './Progress.types';

export const containerCss = css`
  overflow: hidden;
`;

export const sizeCss: Record<Size, SerializedStyles> = {
  sm: css`
    height: 0.125rem;
  `,
  md: css`
    height: 0.25rem;
  `,
  lg: css`
    height: 0.5rem;
  `,
  xl: css`
    height: 1rem;
  `,
};

export const variantCss: Record<ProgressVariant, SerializedStyles> = {
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

export const fillCss = css`
  height: 100%;
  transition: all 200ms ease;
`;
