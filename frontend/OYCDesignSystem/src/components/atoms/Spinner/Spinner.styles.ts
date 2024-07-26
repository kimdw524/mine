import { Theme, css, keyframes } from '@emotion/react';
import { PaletteColor } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

const width = {
  sm: '1.875rem',
  md: '2.8125rem',
  lg: '3.75rem',
  xl: '4.6875rem',
};

export const base = (
  theme: Theme,
  size: Size,
  palette: PaletteColor,
  rotDeg: number,
) => {
  const spin = keyframes`
    from {
        transform: rotate(${rotDeg}deg);
    }
    to {
        transform: rotate(${rotDeg + 420}deg);
    }
  `;

  return css`
    width: ${width[size]};
    height: ${width[size]};
    border: 0.5rem solid #f1f3f5;
    border-top: 0.5rem solid ${palette.main};
    border-radius: 50%;
    animation: ${spin} 0.8s ease-in-out infinite;
  `;
};
