import { api } from './interceptors';

/* 로그인 */
export const UserLogin = (email: string, password: string) => {
  return api({
    url: '/api/auth/login',
    method: 'post',
    data: {
      email: email,
      password: password,
    },
  });
};


// 로그아웃
export const Logout = () => {
  return api({
    url: '/api/auth/logout',
    method:'delete',
    data : {},
  })
} 