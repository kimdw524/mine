/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import ScheduleList from '../../components/molecules/ScheduleList';
import { css } from '@emotion/react';
import { SchedulePeriod } from '.';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDailySchedules } from '../../apis/scheduleApi';
import { formatDate } from '../../utils/dateUtils';
import DetailView from './DetailView';
import useModal from '../../hooks/useModal';
import Modal from '../../hooks/useModal/Modal';

interface ScheduleListFetchProps {
  type: SchedulePeriod;
  date: string;
}

const containerCss = css`
  overflow-x: hidden;

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

  const { open, modal } = useModal();

  return (
    <>
      <Modal data={modal} />
      <div css={containerCss} {...props}>
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
                component: <DetailView data={data} />,
                name: 'detailView',
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
