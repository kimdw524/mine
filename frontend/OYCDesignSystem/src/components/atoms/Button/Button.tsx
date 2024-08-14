/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { ButtonProps } from './Button.types';
import { base, variants } from './Button.styles';

export const Button = ({
  children,
  size = 'md',
  color = 'primary',
  variant = 'contained',
  disabled = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <button
      css={[
        base(theme, size, fullWidth),
        variants[variant](theme, theme.colors[color]),
      ]}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
