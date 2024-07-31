/** @jsxImportSource @emotion/react */
import React, { Suspense, useRef, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { Button, Calendar, Dropdown, Typography } from 'oyc-ds';
import { bottomCss, containerCss, headerCss, scheduleCss } from './style';
import ScheduleListFetch from './ScheduleListFetch';
import { ErrorBoundary } from 'react-error-boundary';
import { getMonthDates, getWeekDates } from '../../utils/dateUtils';
import Create from './Create';
import useModal from '../../hooks/useModal';
import Modal from '../../hooks/useModal/Modal';

export type SchedulePeriod = 'daily' | 'weekly' | 'monthly';

const Schedule = () => {
  const navigate = useNavigate();
  const today = new Date()
    .toLocaleDateString()
    .replaceAll('.', '')
    .replaceAll(' ', '-');
  const [date, setDate] = useState<string>(today);
  const [period, setPeriod] = useState<SchedulePeriod>('daily');
  const selectedRef = useRef<string[]>([today]);
  const { open, modal } = useModal();
  const [year, month] = new Date(date)
    .toLocaleDateString()
    .replaceAll('.', '')
    .split(' ');

  const handlePeriodChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const period = (e.target as HTMLSelectElement).value as SchedulePeriod;
    setPeriod(period);
    updateSelected(date, period);
  };

  const handleCalendarClick = (year: number, month: number, day: number) => {
    const date = `${year}-${month}-${day}`;
    setDate(date);
    updateSelected(date, period);
  };

  const handleCreateSchedule = () => {
    open({
      component: <Create />,
      name: 'createSchedule',
    });
  };

  const updateSelected = (date: string, period: SchedulePeriod) => {
    switch (period) {
      case 'daily': {
        selectedRef.current = [date];
        break;
      }
      case 'weekly': {
        selectedRef.current = getWeekDates(date);
        break;
      }
      case 'monthly': {
        selectedRef.current = getMonthDates(date);
        break;
      }
    }
  };

  return (
    <>
      <Modal data={modal} />
      <div css={containerCss}>
        <div>
          <AppBar label="일정 관리" onBackClick={() => navigate('/')} />
          <div>
            <Calendar
              year={parseInt(year)}
              month={parseInt(month)}
              selected={selectedRef.current}
              onClick={handleCalendarClick}
            />
          </div>
        </div>
        <div css={scheduleCss}>
          <div css={headerCss}>
            <Typography color="secondary" size="xs">
              {selectedRef.current.length === 1
                ? selectedRef.current[0].replaceAll('-', '. ')
                : `${selectedRef.current[0].replaceAll('-', '. ')} ~ ${selectedRef.current.at(-1)!.replaceAll('-', '. ')}`}
            </Typography>
            <div>
              <Dropdown
                size="sm"
                style={{ border: '0' }}
                onChangeCapture={handlePeriodChange}
              >
                <Dropdown.Item value="daily">일간</Dropdown.Item>
                <Dropdown.Item value="weekly">주간</Dropdown.Item>
                <Dropdown.Item value="monthly">월간</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <ErrorBoundary fallback={<>error</>}>
            <Suspense fallback={<></>}>
              <ScheduleListFetch
                key={`${date}${period}`}
                type={period}
                date={date[0]}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div css={bottomCss}>
          <Button size="sm" onClick={handleCreateSchedule}>
            일정 등록
          </Button>
        </div>
      </div>
    </>
  );
};

export default Schedule;
