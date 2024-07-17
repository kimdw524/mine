import { Theme, css } from '@emotion/react';
import { Size } from '../../../themes/themeBase';
import { PaletteColor } from '../../../themes/lightTheme';

const sizes: Record<Size, { width: string }> = {
  sm: { width: '0.875rem' },
  md: { width: '1rem' },
  lg: { width: '1.125rem' },
  xl: { width: '1.25rem' },
};

const polylinesizes: Record<Size, { scale: string }> = {
  sm: { scale: '0.22' },
  md: { scale: '0.25' },
  lg: { scale: '0.28' },
  xl: { scale: '0.31' },
};

export const base = (theme: Theme, color: PaletteColor, size: Size) => css`
  position: absolute;
  cursor: pointer;
  opacity: 0;

  &:checked + svg {
    background-color: ${color.main};
    border: 0.125rem solid ${color.main};
  }

  &:checked + svg polyline {
    stroke-dashoffset: 0;
  }
`;

export const svgCss = (theme: Theme, size: Size) => css`
  width: ${sizes[size].width};
  height: ${sizes[size].width};
  border: 0.125rem solid #999;
  border-radius: 0.375rem;
  background-color: transparent;
  transition:
    background-color 0.3s,
    stroke-dashoffset 0.5s;
  stroke: #f9f9f9;
  stroke-dasharray: 131;
  stroke-dashoffset: -130;
  stroke-linecap: round;
  stroke-width: 0.53rem;
  fill: none;

  polyline {
    transform: scale(${polylinesizes[size].scale});
  }
`;

export const polylineCss = css`
  transition: stroke-dashoffset 0.5s;
`;

export const labelCss = css`
  line-height: 0;
`;
