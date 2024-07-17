import { Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

const sizes: Record<Size, string> = {
  sm: '1.25rem',
  md: '1.75rem',
  lg: '2.125rem',
  xl: '2.5rem',
};

export const base = (
  theme: Theme,
  color: PaletteColor,
  size: Size,
  circular: boolean,
) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${sizes[size]};
  height: ${sizes[size]};
  padding: 0;
  box-sizing: border-box;
  border: 0;
  border-radius: ${circular ? '50%' : '0.25rem'};
  background-color: transparent;
  transition: all 200ms ease;
  user-select: none;

  :enabled {
    cursor: pointer;

    :active {
      background-color: ${color.active};
    }
  }

  :disabled {
    cursor: default;
  }
`;
