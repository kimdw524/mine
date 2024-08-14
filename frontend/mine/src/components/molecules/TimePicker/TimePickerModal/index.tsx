/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { containerCss, menuCss, modalCss, typeCss } from './style';
import { useNavigate } from 'react-router-dom';
import { TimeData } from '..';
import SlideInput from '../../../atoms/SlideInput';
import TransitionAnimation from '../../../common/TransitionAnimation';
import styles from './TimePickerModal.module.css';
import { Button } from 'oyc-ds';

interface TimePickerProps {
  defaultValue: TimeData;
  onChange: (value: TimeData) => void;
}

const types = [
  { name: '오전', value: 'am' },
  { name: '오후', value: 'pm' },
];

const TimePickerModal = ({ defaultValue, onChange }: TimePickerProps) => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>(
    defaultValue.hours >= 12 ? 'pm' : 'am',
  );
  const hoursRef = useRef<number>(defaultValue.hours);
  const minutesRef = useRef<number>(defaultValue.minutes);

  const handleSubmit = () => {
    onChange({
      hours: hoursRef.current + (type === 'am' ? 0 : 12),
      minutes: minutesRef.current,
    });
    navigate(-1);
  };

  useEffect(() => {
    hoursRef.current = defaultValue.hours % 12;
    minutesRef.current = defaultValue.minutes;
  }, [defaultValue.hours, defaultValue.minutes]);

  return (
    <div css={modalCss}>
      <div css={containerCss}>
        <div css={typeCss}>
          <TransitionAnimation
            data-key={type}
            className={{
              normal: styles.fade,
              enter: styles['fade-enter'],
              exit: styles['fade-exit'],
            }}
          >
            {types.map((type, index) => (
              <span
                key={type.value}
                onClick={() => {
                  setType(types[(index + 1) % types.length].value);
                }}
              >
                {type.name}
              </span>
            ))}
          </TransitionAnimation>
        </div>
        <SlideInput
          min={1}
          max={12}
          value={hoursRef.current}
          onChange={(value) => (hoursRef.current = value)}
        />
        <SlideInput
          min={0}
          max={59}
          value={minutesRef.current}
          onChange={(value) => (minutesRef.current = value)}
        />
        <Button css={menuCss} size="sm" onClick={handleSubmit}>
          선택
        </Button>
      </div>
    </div>
  );
};

export default TimePickerModal;
