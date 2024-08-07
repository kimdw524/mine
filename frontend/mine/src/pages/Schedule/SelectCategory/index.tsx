/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { modalCss, containerCss, headerCss, categoryCss } from './style';
import CategorySelect from '../../../components/molecules/CategorySelect';
import { Button, Typography } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';

interface SelectCategoryProps {
  selected: number;
  onChange: (selected: number) => void;
}

const SelectCategory = ({ selected, onChange }: SelectCategoryProps) => {
  const categoryRef = useRef<number>(selected);
  const navigate = useNavigate();

  const handleChange = () => {
    onChange(categoryRef.current);
    navigate(-1);
  };

  return (
    <div css={modalCss}>
      <div css={containerCss}>
        <div css={headerCss}>
          <Typography color="dark" size="md">
            조회할 카테고리를 선택하세요.
          </Typography>
          <Button size="sm" onClick={handleChange}>
            적용
          </Button>
        </div>
        <div css={categoryCss}>
          <CategorySelect
            selected={categoryRef.current}
            onChange={(selected) => (categoryRef.current = selected)}
            multiLine
          >
            <CategorySelect.Item key={0} name="전체" color="#aaa" value={0}>
              <Squares2X2Icon />
            </CategorySelect.Item>
            {Object.entries(scheduleCategoryData).map(([, value]) => (
              <CategorySelect.Item
                key={value.id}
                name={value.name}
                color={value.color}
                value={value.id}
              >
                {value.icon}
              </CategorySelect.Item>
            ))}
          </CategorySelect>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
