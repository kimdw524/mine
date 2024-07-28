/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const containerCss = css`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const Category = ({ children, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div css={containerCss} {...props}>
      {children}
    </div>
  );
};

export default Category;
