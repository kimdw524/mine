/** @jsxImportSource @emotion/react */
import React, { Suspense, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { Calendar, Dropdown, Typography } from 'oyc-ds';
import { calendarCss, containerCss, headerCss, scheduleCss } from './style';
import ScheduleListFetch from './ScheduleListFetch';
import { ErrorBoundary } from 'react-error-boundary';

export type SchedulePeriod = 'daily' | 'weekly' | 'monthly';

const Schedule = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString().replaceAll('.', '').replaceAll(' ', '-'),
  );

  return (
    <div css={containerCss}>
      <div>
        <AppBar label="일정 관리" onBackClick={() => navigate('/')} />
        <div css={calendarCss}>
          <Calendar
            showHeader={false}
            selected={date}
            onClick={(year, month, day) => setDate(`${year}-${month}-${day}`)}
          />
        </div>
      </div>
      <div css={scheduleCss}>
        <div css={headerCss}>
          <Typography color="secondary" size="sm">
            {date.replaceAll('-', ' ')}
          </Typography>
          <div>
            <Dropdown size="sm" style={{ border: '0' }}>
              <Dropdown.Item>일간</Dropdown.Item>
              <Dropdown.Item>주간</Dropdown.Item>
              <Dropdown.Item>월간</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <ErrorBoundary fallback={<>에러 뜸</>}>
          <Suspense fallback={<>로딩 중</>}>
            <ScheduleListFetch key={date} type="daily" date={date} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Schedule;
