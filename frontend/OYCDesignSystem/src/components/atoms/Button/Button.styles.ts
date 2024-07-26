import { SerializedStyles, Theme, css } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';
import { ButtonVariant } from './Button.types';

const spacing = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.25rem',
};

export const base = (theme: Theme, size: Size, fullWidth: boolean) => css`
  padding: calc(${spacing[size]} / 1.375) ${spacing[size]};
  box-sizing: border-box;
  border: 0;
  border-radius: 0.25rem;
  font-size: ${theme.typography.fontSize[size]};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all 100ms ease;
  user-select: none;

  :enabled {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  ${fullWidth &&
  css`
    width: 100%;
  `}
`;

export const variants: Record<
  ButtonVariant,
  (theme: Theme, palette: PaletteColor) => SerializedStyles
> = {
  contained: (theme: Theme, palette: PaletteColor) => css`
    background-color: ${palette.main};
    color: ${palette.contrastText};

    :enabled {
      :active {
        background-color: ${palette.active};
      }
    }

    :disabled {
      background-color: ${palette.disabled};
    }
  `,
  outlined: (theme: Theme, palette: PaletteColor) => css`
    box-shadow: 0 0 0 0.0625rem ${palette.main};
    background-color: ${theme.colors.background};
    color: ${palette.main};

    :enabled {
      :active {
        box-shadow: 0 0 0 0.0625rem ${palette.active};
        color: ${palette.active};
      }
    }

    :disabled {
      box-shadow: 0 0 0 0.0625rem ${palette.disabled};
      color: ${palette.disabled};
    }
  `,
};
