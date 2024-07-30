/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, dateCss, tableCss, weekCss } from './style';
import { Typography } from '../../atoms/Typography';
import { DateData, getDays } from '../../../utils/dayUtils';
import { Day } from '../../atoms/Day';

export interface CalendarProps {
  year?: number;
  month?: number;
  width?: string;
  selected?: string;
  onClick?: (year: number, month: number, day: number) => void;
}

export const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  width = '100%',
  onClick = () => {},
  selected = '',
}: CalendarProps) => {
  const days: DateData[][] = getDays(year, month);
  const weekdayList = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div css={containerCss} style={{ width }}>
      <div css={dateCss}>
        <Typography size="lg" color="dark">
          {year}년 {month}월
        </Typography>
      </div>
      <table css={tableCss}>
        <thead>
          <tr>
            {weekdayList.map((week) => (
              <th key={week}>
                <Typography css={weekCss} color="secondary">
                  {week}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((week, index) => {
            return (
              <tr key={index}>
                {week.map((day, index) => (
                  <td key={index}>
                    <Day
                      key={`${day.month}-${day.day}`}
                      {...day}
                      selected={
                        `${day.year}-${day.month}-${day.day}` === selected
                      }
                      onClick={onClick}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
