import { IAvatar } from '../pages/Main/MypageV2/AvatarProfile';

export const getMainAvatar = (avatars: IAvatar[]) => {
  return avatars[0].isMain ? avatars[0] : avatars[1];
};

export const getNotMainAvatar = (avatars: IAvatar[]) => {
  return avatars[0].isMain ? avatars[1] : avatars[0];
};
