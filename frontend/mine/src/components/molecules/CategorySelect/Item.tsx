import React, { ReactNode } from 'react';
import CategoryIcon from '../../atoms/CategoryIcon';

interface ItemProps {
  children: ReactNode;
  color: string;
  name: string;
}

const Item = ({ children, color, name }: ItemProps) => {
  return (
    <>
      <CategoryIcon color={color}>{children}</CategoryIcon>
    </>
  );
};

export default Item;
