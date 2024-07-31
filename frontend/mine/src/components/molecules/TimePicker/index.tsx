/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Icon } from 'oyc-ds';
import React, { useEffect, useRef } from 'react';

export interface TimeData {
  hours: number;
  minutes: number;
}

export interface TimePickerProps {
  time: TimeData;
  onChange: (time: TimeData) => void;
}

const containerCss = css`
  display: flex;
  align-items: center;
`;

const inputCss = css`
  border: 0;
  background-color: transparent;
  width: 1.5rem;
  padding: 0.375rem 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  outline: none;
`;

const TimePicker = ({ time, onChange }: TimePickerProps) => {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (!hoursRef.current || !minutesRef.current) return;
    [hoursRef.current, minutesRef.current].forEach((target) => {
      let value: number = Math.max(
        parseInt(target.min),
        Math.min(parseInt(target.max), parseInt(target.value)),
      );
      if (isNaN(value)) {
        value = 0;
      }
      target.value = value.toString().padStart(2, '0');
    });

    onChange({
      hours: parseInt(hoursRef.current.value),
      minutes: parseInt(minutesRef.current.value),
    });
  };

  useEffect(() => {
    if (!hoursRef.current || !minutesRef.current) return;
    hoursRef.current.value = time.hours.toString().padStart(2, '0');
    minutesRef.current.value = time.minutes.toString().padStart(2, '0');
  }, [hoursRef, minutesRef, time]);

  return (
    <div css={containerCss}>
      <Icon color="dark" size="sm">
        <ClockIcon />
      </Icon>
      <input
        type="number"
        ref={hoursRef}
        min={0}
        max={23}
        css={inputCss}
        onKeyDown={(e) => e.key === 'Enter' && handleChange()}
        onBlur={handleChange}
      />
      <span>:</span>
      <input
        type="number"
        ref={minutesRef}
        min={0}
        max={59}
        css={inputCss}
        onKeyDown={(e) => e.key === 'Enter' && handleChange()}
        onBlur={handleChange}
      />
    </div>
  );
};

export default TimePicker;
