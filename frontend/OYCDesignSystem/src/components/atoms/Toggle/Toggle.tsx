/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { ToggleProps } from './Toggle.types';
import { base, thumb } from './Toggle.styles';

export const Toggle = ({
  color = 'primary',
  value = false,
  size = 'sm',
  ...props
}: ToggleProps) => {
  const theme = useTheme();

  return (
    <div css={base(theme, theme.colors[color], size)} {...props}>
      <div css={thumb(value, size)}></div>
    </div>
  );
};
