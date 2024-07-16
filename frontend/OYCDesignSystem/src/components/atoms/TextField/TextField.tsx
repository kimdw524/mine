/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { TextFieldProps } from './TextField.types';
import { base } from './TextField.styles';

export const TextField = ({
  color = 'primary',
  variant = 'outlined',
  placeholder = '',
  size = 'md',
  error = false,
  ...props
}: TextFieldProps) => {
  const theme = useTheme();

  return (
    <input
      type="text"
      css={base(theme, size, error)}
      placeholder={placeholder}
      {...props}
    />
  );
};
