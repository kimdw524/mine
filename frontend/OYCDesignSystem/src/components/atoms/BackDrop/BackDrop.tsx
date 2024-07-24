/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { BackDropProps } from './BackDrop.types';
import { base, variants } from './BackDrop.styles';

export const BackDrop = ({
  children,
  size = 'md',
  color = 'primary',
  variant = 'contained',
  disabled = false,
  fullWidth = false,
  ...props
}: BackDropProps) => {
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
