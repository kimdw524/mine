import { api } from '../api/interceptors';


/* 로그인 */
export const UserLogin = (email: string, password: string) => {
  return api({
    url: '/api/auth/login',
    method: 'post',
    data: {
      email: email,
      password: password,
    }
  });
};


