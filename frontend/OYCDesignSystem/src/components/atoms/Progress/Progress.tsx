/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { ProgressProps } from './Progress.types';
import { containerCss, fillCss, sizeCss, variantCss } from './Progress.styles';

export const Progress = ({
  color = 'primary',
  size = 'sm',
  variant = 'rounded',
  value,
  transparentBackground = false,
  max,
  ...props
}: ProgressProps) => {
  const theme = useTheme();

  return (
    <div
      css={[containerCss, sizeCss[size], variantCss[variant]]}
      style={{
        backgroundColor: transparentBackground
          ? 'transparent'
          : theme.colors.light.active,
      }}
      {...props}
    >
      <div
        css={fillCss}
        style={{
          width: `${Math.round((value / max) * 100 * 10) / 10}%`,
          backgroundColor: theme.colors[color].main,
        }}
      ></div>
    </div>
  );
};
