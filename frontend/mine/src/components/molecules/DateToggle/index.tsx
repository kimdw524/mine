/** @jsxImportSource @emotion/react  */
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import colorPalette from 'oyc-ds/dist/themes/colorPalette';
import React from 'react';

interface DateToggleProps {
  label: string;
  date: Date;
  selected?: boolean;
  onClick: () => void;
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 200ms ease;
`;

const selectedCss = css`
  background-color: ${colorPalette.deepPurple[50]};
`;

const DateToggle = ({
  label,
  date,
  selected = false,
  onClick,
}: DateToggleProps) => {
  return (
    <div css={[containerCss, selected && selectedCss]} onClick={onClick}>
      <Typography size="md" color="dark">
        {label}
      </Typography>
      <Typography size="sm" color="secondary">
        {`${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
      </Typography>
    </div>
  );
};

export default DateToggle;
