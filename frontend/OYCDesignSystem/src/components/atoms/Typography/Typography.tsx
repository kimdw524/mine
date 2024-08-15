/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { TypographyProps } from './Typography.types';
import { base } from './Typography.styles';

export const Typography = ({
  children = 'Typography',
  color = 'primary',
  size = 'sm',
  weight = 'medium',
  ...props
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <div css={base(theme, theme.colors[color], size, weight)} {...props}>
      {children}
    </div>
  );
};
