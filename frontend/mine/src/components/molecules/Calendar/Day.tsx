import { Typography } from 'oyc-ds';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import React from 'react';

type DayType = 'weekday' | 'satuarday' | 'sunday' | 'light';

export interface DayProps {
  type: DayType;
  year: number;
  month: number;
  day: number;
}

const Day = ({ type, day }: DayProps) => {
  return (
    <Typography
      color={
        {
          weekday: 'dark',
          satuarday: 'success',
          sunday: 'danger',
          light: 'secondary',
        }[type] as Palette
      }
    >
      {day}
    </Typography>
  );
};

export default Day;
