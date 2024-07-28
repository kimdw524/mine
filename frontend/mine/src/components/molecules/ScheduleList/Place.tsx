/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import React from 'react';

const containerCss = css`
  text-align: right;
`;

const Place = ({ children, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div css={containerCss} {...props}>
      <Typography color="secondary" size="xs">
        {children}
      </Typography>
    </div>
  );
};

export default Place;
