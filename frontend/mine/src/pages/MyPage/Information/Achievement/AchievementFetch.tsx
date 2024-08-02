/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAchievement } from '../../../../apis/mypageApi';
import { achievementListBox } from './style';
import AchievementBox from './AchievementBox';

export interface IAchievement {
  achievement_id: number;
  achievement_title: string;
  achievement_description: string;
  achievement_required_amount: number;
  achievement_count: number;
  achievement_date: string;
  is_achieved: boolean;
}

const AchievementFetch = () => {
  const achievementQuery = useSuspenseQuery({
    queryKey: ['achievement'],
    queryFn: async () => await getAchievement(),
  });

  if (achievementQuery.error && !achievementQuery.isFetching) {
    throw achievementQuery.error;
  }

  return (
    <div css={achievementListBox}>
      {achievementQuery.data.data.achievement.map((info: IAchievement) => {
        return <AchievementBox key={info.achievement_id} info={info} />;
      })}
    </div>
  );
};

export default AchievementFetch;
