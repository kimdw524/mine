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
  position: relative;
  padding: 1rem;
`;

const backgroundCss = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.1875rem;
  border-radius: 1rem;
  background-color: ${colorPalette.deepPurple['A200']};
  opacity: 0.33;
  transition: all 0.2s ease;
`;

const selectedCss = css`
  width: 100%;
  opacity: 1;
`;

const foregroundCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0.5;
  transition: all 0.2s ease;
`;

const foregroundSelectedCss = css`
  opacity: 1;
`;

const DateToggle = ({
  label,
  date,
  selected = false,
  onClick,
}: DateToggleProps) => {
  return (
    <div css={containerCss} onClick={onClick}>
      <div css={[backgroundCss, selected && selectedCss]}></div>
      <div css={[foregroundCss, selected && foregroundSelectedCss]}>
        <Typography size="md" color="dark">
          {label}
        </Typography>
        <Typography size="sm" color="secondary">
          {`${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
        </Typography>
      </div>
    </div>
  );
};

export default DateToggle;
