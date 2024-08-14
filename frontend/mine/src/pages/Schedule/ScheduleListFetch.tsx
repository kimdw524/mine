/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import ScheduleList from '../../components/molecules/ScheduleList';
import { css } from '@emotion/react';
import { SchedulePeriod } from '.';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getSchedules, getSchedulesWithCategory } from '../../apis/scheduleApi';
import { apiFormatDate } from '../../utils/dateUtils';
import useModal from '../../hooks/useModal';
import Edit from './Edit';

interface ScheduleListFetchProps {
  type: SchedulePeriod;
  start: Date;
  end: Date;
  category: number;
}

const containerCss = css`
  overflow-x: hidden;

  > div {
    padding: 1rem;
  }
`;

export const ScheduleListFetch = ({
  type,
  start,
  end,
  category,
}: ScheduleListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [
      'schedule',
      category,
      start.toLocaleDateString(),
      end.toLocaleDateString(),
    ],
    queryFn: () =>
      category === 0
        ? getSchedules(apiFormatDate(start), apiFormatDate(end))
        : getSchedulesWithCategory(
            apiFormatDate(start),
            apiFormatDate(end),
            category,
          ),
  });

  if (error && !isFetching) {
    throw error;
  }

  const { push } = useModal();

  return (
    <>
      <div css={containerCss}>
        {data.data.map((data, index) => (
          <ScheduleList
            key={data.scheduleId}
            data={data}
            onClick={() =>
              push({
                component: <Edit data={data} />,
                name: 'editSchedule',
              })
            }
            style={
              {
                '--duration': `${Math.min(800, index * 200 + 300)}ms`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default ScheduleListFetch;
