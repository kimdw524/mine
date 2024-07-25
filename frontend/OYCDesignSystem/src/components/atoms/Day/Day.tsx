/** @jsxImportSource @emotion/react */
import React from 'react';
import { DayType } from '../../../utils/dayUtils';
import { containerCss, scheduledCss, selectedCss, textCss } from './Day.styles';

export interface DayProps {
  type: DayType;
  year: number;
  month: number;
  day: number;
  scheduled?: boolean;
  selected?: boolean;
  onClick?: (year: number, month: number, day: number) => void;
}

export const Day = ({
  type,
  year,
  month,
  day,
  scheduled = false,
  selected = false,
  onClick = () => {},
}: DayProps) => {
  return (
    <div css={containerCss} onClick={() => onClick(year, month, day)}>
      <div
        css={[textCss, selected && selectedCss]}
        style={{
          color: {
            weekday: '#000',
            satuarday: '#00f',
            holiday: '#f00',
            light: '#bbb',
          }[type],
        }}
      >
        <span>{day}</span>
        {scheduled && <div css={scheduledCss}></div>}
      </div>
    </div>
  );
};
