/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, modalCss } from './style';
import { useNavigate } from 'react-router-dom';
import { TimeData } from '..';
import SlideInput from '../../../atoms/SlideInput';

interface TimePickerProps {
  onChange: (value: TimeData) => void;
}

const TimePickerModal = ({ onChange }: TimePickerProps) => {
  const navigate = useNavigate();

  return (
    <div css={modalCss}>
      <div css={containerCss}>
        <SlideInput min={0} max={59} value={10} />
      </div>
    </div>
  );
};

export default TimePickerModal;
