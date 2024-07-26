/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { BackDropProps } from './BackDrop.types';
import { base } from './BackDrop.styles';

export const BackDrop = ({
  children,
  opacity = 40,
  blur = 40,
  ...props
}: BackDropProps) => {
  const theme = useTheme();

  return (
    <div css={[base(theme, opacity, blur)]} {...props}>
      {children}
    </div>
  );
};
