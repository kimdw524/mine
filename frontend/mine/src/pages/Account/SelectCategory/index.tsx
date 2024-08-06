/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';

interface SelectCategoryProps {
  selected: number[];
}

const SelectCategory = ({ selected }: SelectCategoryProps) => {
  return <div css={containerCss}>안녕</div>;
};

export default SelectCategory;
