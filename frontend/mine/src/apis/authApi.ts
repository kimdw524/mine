import { api } from '../api/interceptors';

export interface SignupParam {
  email: string;
  password: string;
  nickname: string;
  gender: 'M' | 'F';
}

export const signup = (param: SignupParam) => {
  return api.post('/api/auth/user', param);
};

export const checkEmail = (email: string) => {
  return api.get<boolean>(`/api/auth/help/user/${email}`);
};

export const requestVerificationEmail = (param: { email: string }) => {
  return api.post('/api/auth/request-verification-email-code', param);
};

export const verifyEmailCode = (param: { email: string; number: string }) => {
  return api.post('/api/auth/verify-email-code', param);
};
