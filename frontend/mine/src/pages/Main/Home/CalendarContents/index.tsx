/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import {
  accountCss,
  containerCss,
  kindCss,
  scheduleCss,
  sumCss,
  titleCss,
} from './style';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getSchedules } from '../../../../apis/scheduleApi';
import dayjs from 'dayjs';
import TransitionAnimation from '../../../../components/common/TransitionAnimation';
import styles from './CalendarContents.module.css';
import { Icon, Typography } from 'oyc-ds';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { incomeInfo, spendInfo } from '../../../../apis/statisticsApi';
import { scheduleCategoryData } from '../../../../utils/scheduleUtils';
import useModal from '../../../../hooks/useModal';
import Calendar, { CalendarPage } from '../../../Calendar';

interface ISpend {
  spendCategoryId: number;
  categorySum: number;
}

const CalendarContents = () => {
  const modal = useModal();
  const [type, setType] = useState<string>('schedule');

  const [scheduleQuery, spendQuery, incomeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['weekschedule'],
        queryFn: async () =>
          await getSchedules(
            dayjs(new Date()).format('YYYY-MM-DD'),
            dayjs(new Date()).format('YYYY-MM-DD'),
          ),
      },
      {
        queryKey: ['monthspend'],
        queryFn: async () =>
          await spendInfo(
            dayjs(new Date()).format('YYYY-MM-01'),
            dayjs(new Date()).format('YYYY-MM-30'),
          ),
      },
      {
        queryKey: ['monthincome'],
        queryFn: async () =>
          await incomeInfo(
            dayjs(new Date()).format('YYYY-MM-01'),
            dayjs(new Date()).format('YYYY-MM-30'),
          ),
      },
    ],
  });

  const handleCalendarClick = () => {
    modal.push({
      component: <Calendar page={type as CalendarPage} />,
      name: 'calendar',
    });
  };

  const handleTypeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setType((prev) => (prev === 'schedule' ? 'account' : 'schedule'));
  };

  [scheduleQuery, spendQuery, incomeQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error!;
    }
  });

  const [spendSum, setSpendSum] = useState<number>(0);
  const [incomeSum, setIncomeSum] = useState<number>(0);

  useEffect(() => {
    let newSpend = 0;
    spendQuery.data.data.forEach((s: ISpend) => {
      newSpend += s.categorySum;
    });

    setSpendSum(() => newSpend);
    setIncomeSum(() => incomeQuery.data.data);
  });

  return (
    <div css={containerCss} onClick={handleCalendarClick}>
      <div css={kindCss}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TransitionAnimation
            data-key={type}
            className={{
              normal: styles.fade,
              enter: styles['fade-enter'],
              exit: styles['fade-exit'],
            }}
          >
            <Typography
              key="schedule"
              size="lg"
              color="dark"
              onClick={handleTypeClick}
            >
              일정
            </Typography>
            <Typography
              key="account"
              size="lg"
              color="dark"
              onClick={handleTypeClick}
            >
              가계
            </Typography>
          </TransitionAnimation>
          <Icon size="sm" color="dark">
            <ChevronUpDownIcon />
          </Icon>
        </div>

        <div>
          {type === 'schedule' && (
            <Typography size="lg">{scheduleQuery.data.data.length}</Typography>
          )}
          <Typography color="dark" style={{ marginTop: '0.2rem' }}>
            {type === 'schedule' ? '이번 주 일정' : '이번 달 가계'}
          </Typography>
        </div>
      </div>
      {type === 'schedule' ? (
        <div css={scheduleCss}>
          {scheduleQuery.data.data.map((s) => {
            return (
              <Typography
                key={s.scheduleId}
                size="sm"
                color="dark"
                css={titleCss}
              >
                [{scheduleCategoryData[s.categoryId].name}] {s.title}
              </Typography>
            );
          })}
        </div>
      ) : (
        <div css={accountCss}>
          <div css={sumCss}>
            <Typography size="md" color="dark" style={{ display: 'inline' }}>
              지출
            </Typography>
            <Typography size="lg" color="success" style={{ display: 'inline' }}>
              {incomeSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                ' 원'}
            </Typography>
          </div>
          <div css={sumCss}>
            {' '}
            <Typography size="md" color="dark" style={{ display: 'inline' }}>
              수입
            </Typography>
            <Typography size="lg" color="danger" style={{ display: 'inline' }}>
              {spendSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                ' 원'}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarContents;
