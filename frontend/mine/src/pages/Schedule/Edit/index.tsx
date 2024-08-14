/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import {
  bottomCss,
  categoryCss,
  containerCss,
  leftSideCss,
  modalCss,
  periodCss,
  rightSideCss,
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
import {
  deleteSchedule,
  ScheduleData,
  updateSchedule,
} from '../../../apis/scheduleApi';
import useDialog from '../../../hooks/useDialog';
import { AxiosError } from 'axios';

interface EditProps {
  data: ScheduleData;
}

const Edit = ({ data }: EditProps) => {
  const navigate = useNavigate();
  const [dateType, setDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState<Date>(
    new Date(data.startDateTime),
  );
  const [endDate, setEndDate] = useState<Date>(new Date(data.endDateTime));
  const categoryRef = useRef<number>(data.categoryId);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { confirm, alert } = useDialog();

  const { mutate } = useMutation({
    mutationFn: (params: ScheduleData) => updateSchedule(params),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
        navigate(-1);
      }
    },
    onError: async (error: AxiosError) => {
      if (error.response?.status === 404) {
        await alert('이미 삭제된 일정입니다.');
        navigate(-1);
        return;
      }
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (scheduleId: number) => deleteSchedule(scheduleId),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
        navigate(-1);
      }
    },
    onError: async (error: AxiosError) => {
      if (error.response?.status === 404) {
        await alert('이미 삭제된 일정입니다.');
        navigate(-1);
        return;
      }
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
    if (!titleRef.current!.value) {
      alert('제목을 입력해 주세요.');
      return;
    }

    mutate({
      scheduleId: data.scheduleId,
      categoryId: categoryRef.current,
      startDateTime: apiFormatDateTime(startDate),
      endDateTime: apiFormatDateTime(endDate),
      title: titleRef.current!.value,
      description: descriptionRef.current!.value,
      where: whereRef.current!.value,
    });
  };

  const handleDelete = async () => {
    if (!(await confirm('정말로 삭제하시겠습니까?'))) {
      return;
    }

    deleteItem(data.scheduleId);
  };

  return (
    <div css={modalCss}>
      <AppBar label="일정" />
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
            defaultValue={data.title || ''}
          />
          <TextField
            ref={descriptionRef}
            variant="outlined"
            label="내용"
            defaultValue={data.description || ''}
            multiLine
            maxRows={2}
          />
          <TextField
            ref={whereRef}
            variant="outlined"
            label="장소"
            defaultValue={data.where || ''}
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
        <div css={leftSideCss}>
          <Button color="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
        <div css={rightSideCss}>
          <Button color="secondary" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button onClick={handleSubmit}>수정</Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
