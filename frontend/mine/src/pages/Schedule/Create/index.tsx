/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import {
  bottomCss,
  categoryCss,
  containerCss,
  modalCss,
  periodCss,
  textContainerCss,
} from './style';
import { Button, TextField } from 'oyc-ds';
import DateTimePicker from '../../../components/organisms/DateTimePicker';
import DateToggle from '../../../components/molecules/DateToggle';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';
import { useNavigate } from 'react-router-dom';
import CategorySelect from '../../../components/molecules/CategorySelect';
import { apiFormatDateTime } from '../../../utils/dateUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSchedule, ScheduleParam } from '../../../apis/scheduleApi';
import useDialog from '../../../hooks/useDialog';

interface CreateProps {
  onCreate: (date: Date) => void;
  selectedDate?: Date;
}

const Create = ({ onCreate, selectedDate = new Date() }: CreateProps) => {
  const navigate = useNavigate();
  const [dateType, setDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<Date>(selectedDate);
  const [endDate, setEndDate] = useState<Date>(selectedDate);
  const categoryRef = useRef<number>(1);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { alert } = useDialog();

  const { mutate } = useMutation({
    mutationFn: (params: ScheduleParam) => addSchedule(params),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });

        onCreate(startDate);

        navigate(-1);
      }
    },
    onError: (error) => {
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

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

  const handleSubmit = () => {
    mutate({
      categoryId: categoryRef.current,
      startDateTime: apiFormatDateTime(startDate),
      endDateTime: apiFormatDateTime(endDate),
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      where: whereRef.current!.value,
    });
  };

  return (
    <div css={modalCss}>
      <AppBar label="일정 추가" />
      <div css={containerCss}>
        <div css={categoryCss}>
          <CategorySelect
            selected={categoryRef.current}
            onChange={(selected) => (categoryRef.current = selected)}
          >
            {Object.entries(scheduleCategoryData).map(([, value]) => (
              <CategorySelect.Item
                key={value.id}
                name={value.name}
                color={value.color}
                value={value.id}
              >
                {value.icon}
              </CategorySelect.Item>
            ))}
          </CategorySelect>
        </div>
        <div css={textContainerCss}>
          <TextField
            ref={titleRef}
            variant="outlined"
            label="제목"
            defaultValue=""
          />
          <TextField
            ref={descriptionRef}
            variant="outlined"
            label="내용"
            defaultValue=""
            multiLine
            maxRows={2}
          />
          <TextField
            ref={whereRef}
            variant="outlined"
            label="장소"
            defaultValue=""
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
      </div>

      <div css={bottomCss}>
        <Button color="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button onClick={handleSubmit}>등록</Button>
      </div>
    </div>
  );
};

export default Create;
