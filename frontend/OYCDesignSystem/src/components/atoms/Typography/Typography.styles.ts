import { Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { FontSize, FontWeight } from '../../../themes/themeBase';

export const base = (
  theme: Theme,
  palette: PaletteColor,
  size: FontSize,
  weight: FontWeight,
) => css`
  color: ${palette.main};
  font-size: ${theme.typography.fontSize[size]};
  font-weight: ${theme.typography.fontWeight[weight]};
`;
