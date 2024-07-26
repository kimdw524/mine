/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from 'oyc-ds';
import { css } from '@emotion/react';

interface MultipleChoiceProps {
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
`;

const MultipleChoice = ({ items, selected, onSelect }: MultipleChoiceProps) => {
  return (
    <div css={containerCss}>
      {items.map((item, index) => (
        <Button
          key={item}
          color={selected === index ? 'primary' : 'secondary'}
          variant="outlined"
          size="lg"
          onClick={() => onSelect(index)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoice;
