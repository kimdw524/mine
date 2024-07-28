/** @jsxImportSource @emotion/react */
import React from 'react';
import ScheduleList from '../../components/molecules/ScheduleList';
import { Chip } from 'oyc-ds';
import { css } from '@emotion/react';
import { SchedulePeriod } from '.';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDailySchedules } from '../../apis/scheduleApi';
import { scheduleCategoryData } from '../../utils/scheduleUtils';
import { formatDate } from '../../utils/dateUtils';

interface ScheduleListFetchProps {
  type: SchedulePeriod;
  date: string;
}

const containerCss = css`
  > div {
    padding: 1rem;
  }
`;

export const ScheduleListFetch = ({
  type,
  date,
  ...props
}: ScheduleListFetchProps) => {
  const formattedDate = formatDate(date);
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['schedule', formattedDate],
    queryFn: () => getDailySchedules(formattedDate),
  });

  if (error && !isFetching) {
    throw error;
  }

  return (
    <div css={containerCss} {...props}>
      {data.data.map((data) => (
        <ScheduleList key={data.scheduleId}>
          <ScheduleList.Category>
            <Chip
              fill={scheduleCategoryData[data.category].fill}
              color={scheduleCategoryData[data.category].color}
              size="sm"
            >
              {scheduleCategoryData[data.category].name}
            </Chip>
          </ScheduleList.Category>
          <ScheduleList.Title>{data.title}</ScheduleList.Title>
          <ScheduleList.Description>
            {data.description}
          </ScheduleList.Description>
          <ScheduleList.Place>{data.place}</ScheduleList.Place>
        </ScheduleList>
      ))}{' '}
    </div>
  );
};

export default ScheduleListFetch;
