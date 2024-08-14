/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { IconButtonProps } from './IconButton.types';
import { base } from './IconButton.styles';

export const IconButton = ({
  children,
  size = 'md',
  color = 'primary',
  circular = false,
  disabled = false,
  ...props
}: IconButtonProps) => {
  const theme = useTheme();

  return (
    <button
      css={[base(theme, theme.colors[color], size, circular)]}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
