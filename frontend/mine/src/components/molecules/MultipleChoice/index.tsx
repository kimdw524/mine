/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from 'oyc-ds';
import { css } from '@emotion/react';
import { QuestionChoice } from '../../../apis/avatarApi';

interface MultipleChoiceProps {
  items: QuestionChoice[];
  selected: number;
  onSelect: (index: number) => void;
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
`;

const containerLargeCss = css`
  padding: 1rem 0.5rem;
  text-align: left;

  > button {
    width: calc(33.3% - 0.75rem);
    margin: 0.375rem;
  }
`;

const MultipleChoice = ({ items, selected, onSelect }: MultipleChoiceProps) => {
  return (
    <div css={items.length > 6 ? containerLargeCss : containerCss}>
      {items.map((item, index) => (
        <Button
          key={item.questionChoiceId}
          color={selected === index ? 'primary' : 'secondary'}
          variant="outlined"
          size="lg"
          onClick={() => onSelect(index)}
        >
          {item.description}
        </Button>
      ))}
    </div>
  );
};

export default MultipleChoice;
