/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { ChipProps } from './Chip.types';
import { baseCss, sizeCss } from './Chip.styles';

export const Chip = ({
  children,
  color = '#fff',
  fill = '#000',
  size = 'md',
  ...props
}: ChipProps) => {
  return (
    <span
      css={[baseCss, sizeCss[size]]}
      style={{ '--color': color, '--fill': fill } as CSSProperties}
      {...props}
    >
      {children}
    </span>
  );
};
