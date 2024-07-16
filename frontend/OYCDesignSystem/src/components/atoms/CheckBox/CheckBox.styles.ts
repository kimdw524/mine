import { Theme, css } from '@emotion/react';
import { Size } from '../../../themes/themeBase';

const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.625rem',
};

export const base = (theme: Theme, size: Size) => css`
  position: absolute;
  cursor: pointer;
  opacity: 0;

  &:checked + svg {
    background-color: ${theme.colors.primary.main};
    border: 0.125rem solid ${theme.colors.primary.main};
  }

  &:checked + svg polyline {
    stroke-dashoffset: 0;
  }
`;

export const svgCss = (theme: Theme, size: Size) => css`
  border: 0.125rem solid #999;
  border-radius: ${borderRadius[size]};
  background-color: transparent;
  transition:
    background-color 0.4s,
    stroke-dashoffset 1s;
  stroke: #f9f9f9;
  stroke-dasharray: 131;
  stroke-dashoffset: -130;
  stroke-linecap: round;
  stroke-width: 0.53rem;
  fill: none;
`;

export const polylineCss = css`
  transition: stroke-dashoffset 1s;
`;
