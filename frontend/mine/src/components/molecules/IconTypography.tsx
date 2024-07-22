/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { Typography } from 'oyc-ds';
import { containerCss } from './style';

interface IconTypographyProps {
  children: ReactNode;
  label: string;
}

const IconTypography = ({ children, label }: IconTypographyProps) => {
  return (
    <div css={containerCss}>
      {children}
      <Typography color="dark" size="sm" weight="medium">
        {label}
      </Typography>
    </div>
  );
};

export default IconTypography;
