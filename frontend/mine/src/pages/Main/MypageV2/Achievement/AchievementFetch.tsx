/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserAchievement } from '../../../../apis/mypageApi';
import { achievementListBox } from './style';
import AchievementBox from './AchievementBox';

export interface IAchievement {
  achievementId: number;
  title: string;
  description: string;
  amount: number;
  count: number;
  achievedDate?: string;
}

const AchievementFetch = () => {
  const achievementQuery = useSuspenseQuery({
    queryKey: ['achievement'],
    queryFn: async () => await getUserAchievement(),
  });

  if (achievementQuery.error && !achievementQuery.isFetching) {
    throw achievementQuery.error;
  }

  return (
    <div css={achievementListBox}>
      {achievementQuery.data.data.map((info: IAchievement) => {
        return <AchievementBox key={info.achievementId} info={info} />;
      })}
    </div>
  );
};

export default AchievementFetch;
