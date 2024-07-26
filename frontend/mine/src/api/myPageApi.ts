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

/* 인증 메일 전송 */
export const sendEmail = (email: string) => {
  return api({
    url: '/mypage/password/code',
    method: 'post',
    data: {
      email: email,
    },
  });
};

/* 인증 코드 전송 */
export const sendCode = (code: string) => {
  return api({
    url: '/mypage/password/verify',
    method: 'post',
    data: {
      code: code,
    },
  });
};

/* 비밀번호 변경 */
export const changePwd = (pwd: string) => {
  return api({
    url: '/mypage/password',
    method: 'post',
    data: {
      pwd: pwd,
    },
  });
};

/* 업적 조회 */
export const getAchievement = () => {
  return api({
    url: '/mypage/achievement',
    method: 'get',
  });
};
