/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import React from 'react';

const containerCss = css`
  margin: 0.75rem 0 0.375rem 0;
`;

const Title = ({ children, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div css={containerCss} {...props}>
      <Typography size="lg" color="dark">
        {children}
      </Typography>
    </div>
  );
};

export default Title;
