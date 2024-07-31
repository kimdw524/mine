/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import {
  bottomCss,
  categoryCss,
  containerCss,
  modalCss,
  periodCss,
  textContainerCss,
} from './style';
import { Button, Dropdown, TextField, Typography } from 'oyc-ds';
import DateTimePicker from '../../../components/organisms/DateTimePicker';
import DateToggle from '../../../components/molecules/DateToggle';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [dateType, setDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    if (dateType === 'start') {
      setStartDate(date);
      if (date.getTime() > endDate.getTime()) {
        endDate.setTime(date.getTime());
      }
      return;
    }

    setEndDate(date);
    if (date.getTime() < startDate.getTime()) {
      startDate.setTime(date.getTime());
    }
  };

  return (
    <div css={modalCss}>
      <AppBar label="일정 추가" />
      <div css={containerCss}>
        <div css={textContainerCss}>
          <TextField variant="outlined" label="제목" defaultValue="" />
          <TextField
            variant="outlined"
            label="내용"
            defaultValue=""
            multiLine
            maxRows={2}
          />
        </div>
        <div css={periodCss}>
          <DateToggle
            label="시작일"
            date={startDate}
            selected={dateType === 'start'}
            onClick={() => setDateType('start')}
          />
          <DateToggle
            label="종료일"
            date={endDate}
            selected={dateType === 'end'}
            onClick={() => setDateType('end')}
          />
        </div>
        <DateTimePicker
          date={dateType === 'start' ? startDate : endDate}
          onChange={handleDateChange}
        />

        <div css={categoryCss}>
          <Typography color="dark">카테고리</Typography>
          <Dropdown>
            {Object.entries(scheduleCategoryData).map(([key, item]) => (
              <Dropdown.Item key={key}>{item.name}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>

      <div css={bottomCss}>
        <Button color="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button>등록</Button>
      </div>
    </div>
  );
};

export default Create;
