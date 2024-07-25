/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';
import { css } from '@emotion/react';
import { Typography } from '../../atoms/Typography';
import Day from './Day';
import { DateData, getDays } from '../../../utils/dayUtils';

interface CalendarProps {
  year?: number;
  month?: number;
  width?: string;
  height?: string;
}

const tableCss = css`
  width: 100%;
  text-align: center;
`;

const weekCss = css`
  padding: calc(25% - 0.875rem / 4) 0;
`;

const dateCss = css`
  padding: 0.75rem 0.5rem;
`;

export const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  width = '100%',
}: CalendarProps) => {
  const days: DateData[][] = getDays(year, month);

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
            {['일', '월', '화', '수', '목', '금', '토'].map((week) => (
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
                    <Day key={`${day.month}-${day.day}`} {...day} />
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
