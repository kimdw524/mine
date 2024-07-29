/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from '../../atoms/Typography';
import { DateData, getDays } from '../../../utils/dayUtils';
import {
  containerCss,
  dateCss,
  dayListContainerCss,
  tableCss,
  weekCss,
} from './Calendar.style';
import DayList from './DayList';

export interface CalendarProps {
  year?: number;
  month?: number;
  width?: string;
  selected?: string[];
  scheduled?: string[];
  showHeader?: boolean;
  onClick?: (year: number, month: number, day: number) => void;
  onChange?: (year: number, month: number) => void;
}

const transitionDuration = '0.5s';

export const Calendar = ({
  year: initYear = new Date().getFullYear(),
  month: initMonth = new Date().getMonth() + 1,
  width = '100%',
  onClick = () => {},
  onChange = () => {},
  showHeader = true,
  selected = [],
  scheduled = [],
}: CalendarProps) => {
  const [year, setYear] = useState<number>(initYear);
  const [month, setMonth] = useState<number>(initMonth);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextYear = month === 12 ? year + 1 : year,
    nextMonth = month === 12 ? 1 : month + 1;
  const prevYear = month === 1 ? year - 1 : year,
    prevMonth = month === 1 ? 12 : month - 1;

  const days: DateData[][] = getDays(year, month);
  const nextDays: DateData[][] = getDays(nextYear, nextMonth);
  const prevDays: DateData[][] = getDays(prevYear, prevMonth);

  const weekdayList = ['일', '월', '화', '수', '목', '금', '토'];

  const swipeToPrev = useCallback(
    (init: boolean) => {
      if (!containerRef.current) return;
      containerRef.current.style.transition = '';
      if (init) {
        containerRef.current.style.transform =
          'translateX(calc(100% / -3 * 2))';
      }
      const reflow = containerRef.current.offsetTop;
      setYear(prevYear);
      setMonth(prevMonth);
      containerRef.current.style.transition = `transform ${transitionDuration} ease`;
      containerRef.current.style.transform = 'translateX(calc(100% / -3))';
    },
    [prevYear, prevMonth],
  );

  const swipeToNext = useCallback(
    (init: boolean) => {
      if (!containerRef.current) return;
      containerRef.current.style.transition = '';
      if (init) {
        containerRef.current.style.transform =
          'translateX(calc(100% / -3 * 0))';
      }
      const reflow = containerRef.current.offsetTop;
      setYear(nextYear);
      setMonth(nextMonth);
      containerRef.current.style.transition = `transform ${transitionDuration} ease`;
      containerRef.current.style.transform = 'translateX(calc(100% / -3))';
    },
    [nextYear, nextMonth],
  );

  useEffect(() => {
    onChange(year, month);
    if (!containerRef.current) return;
    const container = containerRef.current;
    let startX = 0,
      x = 0,
      down = false;

    const handleTouchStart = (e: TouchEvent | MouseEvent) => {
      startX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      container.style.transition = '';
      down = true;
    };

    const handleTouchMove = (e: TouchEvent | MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      const width = container.getBoundingClientRect().width / 3;
      x = Math.min(
        width,
        Math.max(
          -width,
          (e instanceof TouchEvent ? e.touches[0].clientX : e.clientX) - startX,
        ),
      );
      container.style.transform = `translateX(calc(100% / -3 + ${x}px))`;
    };

    const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
      const point = container.getBoundingClientRect().width / 9;
      down = false;
      if (x > point) {
        container.style.transform = `translateX(calc(100% / -3 * 2 + ${x}px))`;
        swipeToPrev(false);
        return;
      }

      if (x < -point) {
        container.style.transform = `translateX(calc(${x}px))`;
        swipeToNext(false);
        return;
      }

      container.style.transition = `transform ${transitionDuration} ease`;
      container.style.transform = 'translateX(calc(100% / -3))';
    };
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mousedown', handleTouchStart);
    window.addEventListener('mouseup', handleTouchEnd);
    window.addEventListener('mousemove', handleTouchMove);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleTouchStart);
      window.removeEventListener('mousemove', handleTouchMove);
      window.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [containerRef, swipeToPrev, swipeToNext]);

  return (
    <div css={containerCss} style={{ width }}>
      {showHeader && (
        <div css={dateCss}>
          <Typography size="lg" color="dark">
            {year}년 {month}월
          </Typography>
        </div>
      )}
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
      </table>
      <div
        css={dayListContainerCss}
        style={{ transform: 'translateX(calc(100% / -3))' }}
        ref={containerRef}
      >
        <DayList
          days={prevDays}
          selected={selected}
          scheduled={scheduled}
          onClick={onClick}
        />
        <DayList
          days={days}
          selected={selected}
          scheduled={scheduled}
          onClick={onClick}
        />
        <DayList
          days={nextDays}
          selected={selected}
          scheduled={scheduled}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
