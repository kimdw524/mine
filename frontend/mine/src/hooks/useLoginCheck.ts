import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserAvatars } from '../apis/mypageApi';

export const useLoginCheck = () => {
  const nav = useNavigate();

  const avatarInfoQuery = useSuspenseQuery({
    queryKey: ['avatarinfo'],
    queryFn: async () => await getUserAvatars(),
  });

  useEffect(() => {
    if (avatarInfoQuery.data?.data) {
      nav('/');
    }
  }, []);

  if (avatarInfoQuery.error && !avatarInfoQuery.isFetching) {
    throw avatarInfoQuery.error;
  }
};
