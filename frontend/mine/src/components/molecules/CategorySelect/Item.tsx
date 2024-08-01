/** @jsxImportSource @emotion/react */
import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import CategoryIcon from '../../atoms/CategoryIcon';
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import { CategorySelectContext } from '.';

interface ItemProps {
  children: ReactNode;
  color: string;
  name: string;
  value: number;
}

const containerCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s ease;
`;

export const unselectedCss = css`
  opacity: 0.66;
  transform: scale(0.8);
`;

const Item = ({ children, color, name, value }: ItemProps) => {
  const { selected, setSelected } = useContext(CategorySelectContext);
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      css={[containerCss, selected !== value && unselectedCss]}
      ref={itemRef}
      onClick={() => setSelected(value)}
    >
      <CategoryIcon color={color}>{children}</CategoryIcon>
      <Typography color="dark">{name}</Typography>
    </div>
  );
};

export default Item;
