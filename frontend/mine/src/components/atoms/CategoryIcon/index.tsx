/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { CSSProperties, ReactNode } from 'react';

const containerCss = css`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: var(--color);
`;

interface CategoryIconProps {
  children: ReactNode;
  color: string;
}

const CategoryIcon = ({ children, color }: CategoryIconProps) => {
  return (
    <div
      css={containerCss}
      style={
        {
          '--color': color,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default CategoryIcon;
