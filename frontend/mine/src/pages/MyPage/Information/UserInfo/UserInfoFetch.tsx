/** @jsxImportSource @emotion/react */
import React from 'react';
import { userInfoBox } from './style';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../../api/myPageApi';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';

const UserInfoFetch = () => {
  const userInfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userInfoQuery.error && !userInfoQuery.isFetching) {
    throw userInfoQuery.error;
  }

  return (
    <div css={userInfoBox}>
      {Object.keys(userInfoQuery.data.data).map((v: string) => {
        return (
          <InfoBox key={v} label={v} content={userInfoQuery.data.data[v]} />
        );
      })}
    </div>
  );
};

export default UserInfoFetch;
