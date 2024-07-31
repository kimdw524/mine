/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'oyc-ds';
import TimePicker, { TimeData } from '../../molecules/TimePicker';

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  date?: Date;
}

const timeCss = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const DateTimePicker = ({
  onChange,
  date = new Date(),
}: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  );
  const timeRef = useRef<TimeData>({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  const handleDateChange = (year: number, month: number, day: number) => {
    const newDate = `${year}-${month}-${day}`;
    setSelectedDate(newDate);
    onChange(
      new Date(
        `${newDate} ${timeRef.current.hours}:${timeRef.current.minutes}`,
      ),
    );
  };

  const handleTimeChange = (time: TimeData) => {
    timeRef.current = time;
    onChange(
      new Date(
        `${selectedDate} ${timeRef.current.hours}:${timeRef.current.minutes}`,
      ),
    );
  };

  useEffect(() => {
    setSelectedDate(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    );
    timeRef.current = { hours: date.getHours(), minutes: date.getMinutes() };
  }, [date]);

  return (
    <div>
      <Calendar
        onClick={handleDateChange}
        selected={[selectedDate]}
        year={parseInt(selectedDate.split('-')[0])}
        month={parseInt(selectedDate.split('-')[1])}
      />
      <div css={timeCss}>
        <TimePicker onChange={handleTimeChange} time={timeRef.current} />
      </div>
    </div>
  );
};

export default DateTimePicker;
