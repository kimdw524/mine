/** @jsxImportSource @emotion/react */
import React, { Suspense, useRef, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { Button, Calendar, Chip, Dropdown, Typography } from 'oyc-ds';
import {
  bottomCss,
  containerCss,
  headerCss,
  menuCss,
  scheduleCss,
} from './style';
import ScheduleListFetch from './ScheduleListFetch';
import { ErrorBoundary } from 'react-error-boundary';
import {
  getCalendarDate,
  getMonthDates,
  getWeekDates,
} from '../../utils/dateUtils';
import Create from './Create';
import useModal from '../../hooks/useModal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Search from './Search';
import Error from '../../components/molecules/Error';
import ChipList from '../../components/molecules/ChipList';
import SelectCategory from './SelectCategory';
import { accountCategoryData } from '../../utils/accountUtils';
import { useQuery } from '@tanstack/react-query';
import { getSchedules } from '../../apis/scheduleApi';

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
  const { push } = useModal();
  const [category, setCategory] = useState<number>(0);
  const [calendarPeriod, setCalendarPeriod] = useState<string[]>(['', '']);
  const [year, month] = new Date(date)
    .toLocaleDateString()
    .replaceAll('.', '')
    .split(' ');

  const { data } = useQuery({
    queryKey: ['schedule', '0', calendarPeriod[0], calendarPeriod[1]],
    queryFn: () => getSchedules(calendarPeriod[0], calendarPeriod[1]),
  });

  const handlePeriodChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const period = (e.target as HTMLSelectElement).value as SchedulePeriod;
    setPeriod(period);
    updateSelected(date, period);
  };

  const getScheduled = (): string[] => {
    if (!data) {
      return [];
    }

    const set = new Set(
      data.data.map((schedule) =>
        getCalendarDate(new Date(schedule.startDateTime)),
      ),
    );
    return Array.from(set);
  };

  const handleCalendarClick = (year: number, month: number, day: number) => {
    const date = `${year}-${month}-${day}`;
    setDate(date);
    updateSelected(date, period);
  };

  const handleCreateSchedule = () => {
    push({
      component: <Create />,
      name: 'createSchedule',
    });
  };

  const handleSearchClick = () => {
    push({
      component: <Search />,
      name: 'searchSchedule',
    });
  };

  const handleSelectCategory = () => {
    push({
      component: (
        <SelectCategory
          selected={category}
          onChange={(selected) => {
            setCategory(selected);
          }}
        />
      ),
      name: 'selectAccountCategory',
    });
  };

  const handleCalendarChange = (
    year: number,
    month: number,
    start: string,
    end: string,
  ) => {
    setCalendarPeriod([start, end]);
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
      <div css={containerCss}>
        <div>
          <AppBar
            label="일정 관리"
            onBackClick={() => navigate(-1)}
            menu={[
              { icon: <MagnifyingGlassIcon />, onClick: handleSearchClick },
            ]}
          />
          <div>
            <Calendar
              year={parseInt(year)}
              month={parseInt(month)}
              selected={selectedRef.current}
              scheduled={getScheduled()}
              onChange={handleCalendarChange}
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
            <div css={menuCss}>
              <ChipList ellipsis={false} onClick={handleSelectCategory}>
                {category === 0 ? (
                  <Chip size="sm" fill="#0087ff">
                    전체
                  </Chip>
                ) : (
                  <Chip size="sm" fill="#ff3f3f">
                    {accountCategoryData[category].name}
                  </Chip>
                )}
              </ChipList>
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
          <ErrorBoundary fallbackRender={(props) => <Error {...props} />}>
            <Suspense fallback={<></>}>
              <ScheduleListFetch
                key={`${date}${period}`}
                type={period}
                start={new Date(selectedRef.current[0])}
                end={new Date(selectedRef.current.at(-1) || '')}
                category={category}
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
