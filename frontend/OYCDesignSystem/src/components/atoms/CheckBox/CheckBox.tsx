/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { CheckBoxProps } from './CheckBox.types';
import { base, svgCss, polylineCss, labelCss } from './CheckBox.styles';

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ color = 'primary', size = 'md', ...props }, ref) => {
    const theme = useTheme();

    return (
      <label css={labelCss}>
        <input
          type="checkbox"
          css={[base(theme, theme.colors[color], size)]}
          ref={ref}
          {...props}
        />
        <svg css={svgCss(theme, size)} width="64" height="64">
          <polyline css={polylineCss} points="53 16 24 45 11 32"></polyline>
        </svg>
      </label>
    );
  },
);

CheckBox.displayName = 'CheckBox';
