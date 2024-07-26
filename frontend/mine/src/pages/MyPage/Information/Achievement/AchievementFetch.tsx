/** @jsxImportSource @emotion/react */
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { getAchievement } from '../../../../api/myPageApi';

const AchievementFetch = () => {
  const achievementQuery = useSuspenseQuery({
    queryKey: ['achievement'],
    queryFn: async () => await getAchievement(),
  });

  if (achievementQuery.error && !achievementQuery.isFetching) {
    throw achievementQuery.error;
  }

  return <>achievement fetch</>;
};

export default AchievementFetch;
