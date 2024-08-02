/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import ScheduleList from '../../components/molecules/ScheduleList';
import { css } from '@emotion/react';
import { SchedulePeriod } from '.';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getSchedules } from '../../apis/scheduleApi';
import { apiFormatDate } from '../../utils/dateUtils';
import useModal from '../../hooks/useModal';
import Modal from '../../hooks/useModal/Modal';
import Edit from './Edit';

interface ScheduleListFetchProps {
  type: SchedulePeriod;
  start: Date;
  end: Date;
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
}: ScheduleListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [
      'schedule',
      start.toLocaleDateString(),
      end.toLocaleDateString(),
    ],
    queryFn: () => getSchedules(apiFormatDate(start), apiFormatDate(end)),
  });

  if (error && !isFetching) {
    throw error;
  }

  const { open, modal } = useModal();

  return (
    <>
      <Modal data={modal} />
      <div css={containerCss}>
        {data.data.map((data, index) => (
          <ScheduleList
            key={data.scheduleId}
            title={data.title}
            description={data.description}
            category={data.categoryId}
            startDateTime={data.startDateTime}
            endDateTime={data.endDateTime}
            onClick={() =>
              open({
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
