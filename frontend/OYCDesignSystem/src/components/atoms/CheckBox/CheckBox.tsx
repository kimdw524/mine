/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { CheckBoxProps } from './CheckBox.types';
import { base, svgCss, polylineCss } from './CheckBox.styles';

export const CheckBox = ({
  color = 'primary',
  size = 'md',
  ...props
}: CheckBoxProps) => {
  const theme = useTheme();

  return (
    <label>
      <input
        type="checkbox"
        css={[base(theme, theme.colors[color], size)]}
        {...props}
      />
      <svg css={svgCss(theme, size)} width="64" height="64">
        <polyline css={polylineCss} points="53 16 24 45 11 32"></polyline>
      </svg>
    </label>
  );
};
