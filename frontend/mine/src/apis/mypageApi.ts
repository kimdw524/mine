import { api } from './interceptors';

/* 사용자 정보 조회 */
export const getUserInfo = () => {
  return api({
    url: '/api/user/info',
    method: 'get',
  });
};

/* 사용자 정보 수정 */
export const updateNickname = (newNickname: string) => {
  return api({
    url: '/api/user/info',
    method: 'patch',
    data: {
      nickname: newNickname,
    },
  });
};

/* 이메일 인증코드 전송 */
export const sendCode = (email: string) => {
  return api({
    url: '/api/auth/help/password/request-verification-email-code',
    method: 'post',
    data: {
      email: email,
    },
  });
};

/* 이메일 인증번호 검증 */
export const verifyCode = (email: string, code: string) => {
  return api({
    url: '/api/auth/verify-email-code',
    method: 'post',
    data: {
      email: email,
      number: code,
    },
  });
};

/* 비밀번호 변경 */
export const updatePassword = (password: string) => {
  return api({
    url: '/api/auth/help/password',
    method: 'patch',
    data: {
      password: password,
    },
  });
};

/* 업적 조회 */
export const getUserAchievement = () => {
  return api({
    url: '/api/users/achievements',
    method: 'get',
  });
};

/* 사용자 아바타 조회 */
export const getUserAvatars = () => {
  return api({
    url: '/api/avatars',
    method: 'get',
  });
};

/* 사용자 아바타 기본정보 수정 */
export const updateAvatarInfo = (
  avatarId: number,
  infoType: string,
  value: string,
) => {
  return api({
    url: `/api/avatars/${avatarId}`,
    method: 'patch',
    data: {
      [infoType]: value,
    },
  });
};

/* 아바타 질문 조회 */
export const getQuestions = () => {
  return api({
    url: `/api/question`,
    method: 'get',
  });
};

/* 아바타 질문 응답 조회 */
export const getAnswers = (avatarId: number) => {
  return api({
    url: `/api/avatars/${avatarId}/questions`,
    method: 'get',
  });
};
