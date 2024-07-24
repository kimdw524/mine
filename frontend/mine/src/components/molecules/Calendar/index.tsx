/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';
import { Typography } from 'oyc-ds';
import { css } from '@emotion/react';
import Day from './Day';

// interface CalendarProps {}

interface DayProps {}

interface DateData {
  year: number;
  month: number;
  day: number;
}

const weekCss = css`
  padding-bottom: 0.5rem;
`;

const tableCss = css`
  width: 100%;
  margin-top: 0.875rem;
  text-align: center;
`;

const getLastMonth = (year: number, month: number): DateData => {
  if (month === 0) {
    year--;
    month = 11;
  } else {
    month--;
  }
  return { year, month, day: 1 };
};

const getDays = (year: number, month: number): DayProps[][] => {
  const days: DayProps[][] = [];
  const lastMonthEnd = new Date(year, month - 1, 0);
  const { year: lastYear, month: lastMonth } = getLastMonth(year, month);
  if (lastMonthEnd.getDay() < 6) {
    days.push([]);
    for (
      let i = lastMonthEnd.getDate() + 5 - lastMonthEnd.getDay();
      i <= lastMonthEnd.getDate();
      i++
    ) {
      days[0].push({ year: lastYear, month: lastMonth, day: i });
    }
  }

  return days;
};

const Calendar = () => {
  const days = [];

  return (
    <div css={containerCss}>
      <Typography size="lg" color="dark">
        2024년 7월
      </Typography>
      <table css={tableCss}>
        <tr>
          {['일', '월', '화', '수', '목', '금', '토'].map((week) => (
            <th key={week} css={weekCss}>
              <Typography color="secondary">{week}</Typography>
            </th>
          ))}
        </tr>
        <tr>
          {new Array(7).fill(0).map((day, index) => (
            <td key={index}>
              <Day day={index + 1} type={'weekday'} />
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Calendar;
