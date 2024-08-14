/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from 'oyc-ds';
import colorPalette from 'oyc-ds/dist/themes/colorPalette';
import React, { useState } from 'react';

export type PeriodSelected = 'start' | 'end';

interface PeriodProps {
  start?: Date;
  end?: Date;
  onClick: (selected: PeriodSelected) => void;
}

const containerCss = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const dateCss = css`
  padding: 0.375rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
`;

const dateSelectedCss = css`
  background-color: ${colorPalette.purple['50']};
`;

const Period = ({
  start = new Date(),
  end = new Date(),
  onClick,
}: PeriodProps) => {
  const handleClick = (selected: PeriodSelected) => {
    setSelected(selected);
    onClick(selected);
  };

  const [selected, setSelected] = useState<PeriodSelected>('start');
  return (
    <div css={containerCss}>
      <div
        css={[dateCss, selected === 'start' && dateSelectedCss]}
        onClick={() => handleClick('start')}
      >
        <Typography size="xs" color="dark">
          {start.toLocaleDateString().slice(0, -1)}
        </Typography>
      </div>
      <Typography size="xs" color="dark">
        ~
      </Typography>
      <div
        css={[dateCss, selected === 'end' && dateSelectedCss]}
        onClick={() => handleClick('end')}
      >
        <Typography size="xs" color="dark">
          {end.toLocaleDateString().slice(0, -1)}
        </Typography>
      </div>
    </div>
  );
};

export default Period;
