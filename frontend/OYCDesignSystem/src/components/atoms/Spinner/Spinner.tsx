/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { SpinnerProps } from './Spinner.types';
import { base } from './Spinner.styles';

export const Spinner = ({ children, ...props }: SpinnerProps) => {
  const theme = useTheme();

  return (
    <div css={[base(theme)]} {...props}>
      {children}
    </div>
  );
};
