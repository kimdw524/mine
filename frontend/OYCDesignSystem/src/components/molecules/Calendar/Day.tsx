/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Palette } from '../../../themes/lightTheme';
import { DayType } from '../../../utils/dayUtils';
import { css } from '@emotion/react';

export interface DayProps {
  type: DayType;
  year: number;
  month: number;
  day: number;
  selected?: boolean;
}

const containerCss = css`
  padding: calc(33% - 1.5rem / 3) 0;
`;

const textCss = css`
  width: 1.5rem;
  margin: 0 auto;
  padding: 0.3125rem 0;
  border-radius: 50%;
  background-color: rgba(170, 0, 255, 0.2);
  color: var(--color);
  font-weight: 500;
  font-size: 0.875rem;
`;

const Day = ({ type, year, month, day, selected = true }: DayProps) => {
  return (
    <div css={containerCss}>
      <div
        css={textCss}
        style={{
          color: {
            weekday: '#000',
            satuarday: '#00f',
            holiday: '#f00',
            light: '#ccc',
          }[type],
        }}
      >
        {day}
      </div>
    </div>
  );
};

export default Day;
