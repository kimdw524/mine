/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ScheduleSearchType } from '.';
import useModal from '../../../hooks/useModal';
import Edit from '../Edit';
import { css } from '@emotion/react';
import NoResult from '../../../components/molecules/NoResult';
import ScheduleList from '../../../components/molecules/ScheduleList';
import {
  searchSchedules,
  searchSchedulesByChat,
} from '../../../apis/scheduleApi';

interface SearchListFetchProps {
  query: string;
  type: ScheduleSearchType;
}

const containerCss = css`
  overflow-x: hidden;
  margin-top: 1rem;
  min-height: 100%;

  > div {
    padding: 1rem;
  }
`;

const SearchListFetch = ({ query, type }: SearchListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [
      'schedule',
      type === 'keyword' ? 'search' : 'searchByChat',
      query,
    ],
    queryFn: () =>
      type === 'keyword'
        ? searchSchedules(query)
        : searchSchedulesByChat(query),
  });

  if (error && !isFetching) {
    throw error;
  }

  const { push } = useModal();

  return (
    <>
      {data.data.length === 0 ? (
        <NoResult />
      ) : (
        <div css={containerCss}>
          {data.data.map((data, index) => (
            <ScheduleList
              key={data.scheduleId}
              data={data}
              onClick={() =>
                push({
                  component: <Edit data={data} />,
                  name: 'editAccountBySearch',
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
      )}
    </>
  );
};

export default SearchListFetch;
