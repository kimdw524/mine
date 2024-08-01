/** @jsxImportSource @emotion/react */
import React, { ReactNode, createContext, useState } from 'react';
import Item from './Item';

export const CategorySelectContext = createContext<string>('');

interface CategorySelectProps {
  children: ReactNode;
}

const CategorySelect = ({ children }: CategorySelectProps) => {
  const [selected, setSelected] = useState<string>('');

  return (
    <CategorySelectContext.Provider value={selected}>
      {children}
    </CategorySelectContext.Provider>
  );
};

CategorySelect.Item = Item;

export default CategorySelect;
