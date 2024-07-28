import { css, SerializedStyles } from '@emotion/react';
import { Size } from '../../../themes/themeBase';

export const baseCss = css`
  border-radius: 1.5rem;
  background-color: var(--fill);
  box-shadow: 0 0 0.125rem 0 #ccc;
  color: var(--color);
  user-select: none;
`;

export const sizeCss: Record<Size, SerializedStyles> = {
  sm: css`
    padding: calc(0.375rem + 1px) 0.625rem 0.375rem 0.625rem;
    font-size: 0.75rem;
  `,
  md: css`
    padding: calc(0.5rem + 1px) 0.75rem calc(0.5rem - 1px) 0.75rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: calc(0.5rem + 2px) 0.875rem 0.5rem 0.875rem;
    font-size: 1rem;
  `,
  xl: css`
    padding: calc(0.75rem + 2px) 1rem 0.75rem 1rem;
    font-size: 1.125rem;
  `,
};
