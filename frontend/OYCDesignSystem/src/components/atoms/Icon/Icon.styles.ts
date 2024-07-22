import { Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

const sizes: Record<Size, string> = {
  sm: '1.25rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
};

export const base = (theme: Theme, palette: PaletteColor, size: Size) => css`
  color: ${palette.main};
  line-height: 0;

  svg {
    width: ${sizes[size]};
    height: ${sizes[size]};
  }
`;
