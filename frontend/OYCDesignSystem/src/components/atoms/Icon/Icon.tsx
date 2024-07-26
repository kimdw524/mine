/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { IconProps } from './Icon.types';
import { base } from './Icon.styles';

export const Icon = ({
  children = '',
  color = 'primary',
  size = 'sm',
  ...props
}: IconProps) => {
  const theme = useTheme();

  return (
    <span css={base(theme, theme.colors[color], size)} {...props}>
      {children}
    </span>
  );
};
