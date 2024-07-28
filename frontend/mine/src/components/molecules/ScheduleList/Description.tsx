/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import React from 'react';

const containerCss = css`
  margin: 0.25rem 0;
`;

const Description = ({ children, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div css={containerCss} {...props}>
      <Typography color="secondary" size="sm">
        {children}
      </Typography>
    </div>
  );
};

export default Description;
