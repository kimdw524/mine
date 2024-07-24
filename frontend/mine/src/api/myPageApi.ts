import { api } from './interceptors';

/* 사용자 정보 조회 */
export const getUserInfo = () => {
  return api({
    url: '/mypage/userinfo',
    method: 'get',
  });
};

/* 사용자 닉네임 조회 */
export const getUserNickname = () => {
  return api({
    url: '/mypage/nickname',
    method: 'get',
  });
};

/* 닉네임 중복 검사 */
export const nicknameDuplicate = (newNick: string) => {
  return api({
    url: '/mypage/nicknames',
    method: 'get',
    params: { nick: newNick },
  });
};

/* 닉네임 변경 */
export const changeNickname = (newNick: string) => {
  return api({
    url: '/mypage/nickname',
    method: 'patch',
    data: {
      nick: newNick,
    },
  });
};
