/** @jsxImportSource @emotion/react */
import React, { ReactNode, createContext, useRef, useState } from 'react';
import Item from './Item';
import { css } from '@emotion/react';

export interface SelectedContext {
  selected: number;
  setSelected: (selected: number) => void;
}
export const CategorySelectContext = createContext<SelectedContext>(
  {} as SelectedContext,
);

interface CategorySelectProps {
  children: ReactNode;
  selected: number;
  onChange: (selected: number) => void;
}

const containerCss = css`
  display: flex;
  gap: 0.75rem;
  overflow-y: scroll;
  padding-bottom: 0.5rem;

  > div {
    flex-shrink: 0;
  }
`;

const CategorySelect = ({
  children,
  selected: initSelected,
  onChange,
}: CategorySelectProps) => {
  const [selected, setSelected] = useState<number>(initSelected);
  const containerRef = useRef<HTMLDivElement>(null);

  const set = (selected: number) => {
    setSelected(selected);
    onChange(selected);
  };

  return (
    <CategorySelectContext.Provider value={{ selected, setSelected: set }}>
      <div ref={containerRef} css={containerCss}>
        {children}
      </div>
    </CategorySelectContext.Provider>
  );
};

CategorySelect.Item = Item;

export default CategorySelect;
