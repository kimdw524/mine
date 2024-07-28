/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import ScheduleList from '../../components/molecules/ScheduleList';
import { css } from '@emotion/react';
import { SchedulePeriod } from '.';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDailySchedules } from '../../apis/scheduleApi';
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
      {data.data.map((data, index) => (
        <ScheduleList
          key={data.scheduleId}
          title={data.title}
          description={data.description}
          category={data.category}
          style={
            {
              '--duration': `${Math.min(1500, (index + 1) * 300)}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ScheduleListFetch;
