/** @jsxImportSource @emotion/react */
import { ClockIcon } from '@heroicons/react/24/outline';
import { Icon } from 'oyc-ds';
import React from 'react';
import { containerCss, timeCss } from './style';
import useModal from '../../../hooks/useModal';
import TimePickerModal from './TimePickerModal';

export interface TimeData {
  hours: number;
  minutes: number;
}

export interface TimePickerProps {
  time: TimeData;
  onChange: (time: TimeData) => void;
}

const TimePicker = ({ time, onChange }: TimePickerProps) => {
  const modal = useModal();

  const handleChange = (value: TimeData) => {
    onChange(value);
  };

  const handleClick = () => {
    modal.push({
      component: (
        <TimePickerModal defaultValue={time} onChange={handleChange} />
      ),
      name: 'timePicker',
    });
  };

  return (
    <div css={containerCss}>
      <Icon color="dark" size="sm">
        <ClockIcon />
      </Icon>
      <div css={timeCss} onClick={handleClick}>
        {time.hours.toString().padStart(2, '0')} :{' '}
        {time.minutes.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimePicker;
