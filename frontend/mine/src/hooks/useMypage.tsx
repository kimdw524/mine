import React, { Fragment, ReactNode, useContext } from 'react';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { createContext } from 'react';
import { getUserAvatars, getUserInfo } from '../apis/mypageApi';

export interface IUserInfo {
  email: string;
  gender: string;
  id: number;
  nickname: string;
}

export interface IAvatar {
  avatarId: number;
  avatarName: string;
  birthday: string;
  personality: string;
  residence: string;
  voiceId: string;
  job: string;
  avatarModel: string;
  isMain: boolean;
}

interface IMypageContext {
  getUser: () => IUserInfo;
  getAvatar: () => IAvatar[];
  updateInfo: (info: string) => void;
  getMainAvatar: () => IAvatar;
  getNotMainAvatar: () => IAvatar;
  getAvatarById: (avatarId: number) => IAvatar;
}

export const MypageContext = createContext<IMypageContext>(
  {} as IMypageContext,
);

export const MypageProvider = (props: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, avatar] = useSuspenseQueries({
    queries: [
      { queryKey: ['userinfo'], queryFn: async () => await getUserInfo() },
      { queryKey: ['avatarinfo'], queryFn: async () => await getUserAvatars() },
    ],
  });

  [user, avatar].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const getUser = () => user.data.data;
  const getAvatar = () => avatar.data.data;
  const updateInfo = (info: string) => {
    queryClient.invalidateQueries({ queryKey: [`${info}info`] });
  };
  const getMainAvatar = () => {
    if (!avatar.data.data.length) {
      return null;
    }

    if (avatar.data.data.length === 1) return avatar.data.data[0];
    else
      return avatar.data.data[0].isMain
        ? avatar.data.data[0]
        : avatar.data.data[1];
  };
  const getNotMainAvatar = () => {
    if (!avatar.data.data.length) {
      return null;
    }

    if (avatar.data.data.length === 1) return avatar.data.data[0];
    else
      return avatar.data.data[0].isMain
        ? avatar.data.data[1]
        : avatar.data.data[0];
  };
  const getAvatarById = (avatarId: number) => {
    let res;
    for (let i = 0; i < avatar.data.data.length; i++) {
      if (avatar.data.data[i].avatarId === avatarId) res = avatar.data.data[i];
    }
    return res;
  };

  return (
    <MypageContext.Provider
      value={{
        getUser,
        getAvatar,
        updateInfo,
        getMainAvatar,
        getNotMainAvatar,
        getAvatarById,
      }}
    >
      {props.children}
    </MypageContext.Provider>
  );
};

const useMypage = () => {
  const mypageContext = useContext(MypageContext);

  const getUser = () => mypageContext.getUser();
  const getAvatar = () => mypageContext.getAvatar();
  const updateInfo = (info: string) => mypageContext.updateInfo(info);
  const getMainAvatar = () => mypageContext.getMainAvatar();
  const getNotMainAvatar = () => mypageContext.getNotMainAvatar();
  const getAvatarById = (avatarId: number) =>
    mypageContext.getAvatarById(avatarId);

  return {
    getUser,
    getAvatar,
    updateInfo,
    getMainAvatar,
    getNotMainAvatar,
    getAvatarById,
  };
};

export default useMypage;
