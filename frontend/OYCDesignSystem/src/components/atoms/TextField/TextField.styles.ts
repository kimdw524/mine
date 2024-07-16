import { Theme, css } from '@emotion/react';
import { Size } from '../../../themes/themeBase';

const spacing = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.25rem',
};

const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.625rem',
};

export const base = (theme: Theme, size: Size, error: boolean) => css`
  width: 100%;
  padding: ${spacing[size]};
  box-sizing: border-box;
  border: 0.0875rem solid
    ${error ? theme.colors.danger.main : theme.colors.secondary.main};
  border-radius: ${borderRadius[size]};
  font-size: ${theme.typography.fontSize[size]};
  transition: all 100ms ease;
  outline: none;

  ${!error &&
  css`
    :focus {
      border: 0.0875rem solid ${theme.colors.primary.main};
    }
  `}
`;
