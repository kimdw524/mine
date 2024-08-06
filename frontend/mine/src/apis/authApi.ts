import { api } from './interceptors';

export interface SignupParam {
  email: string;
  password: string;
  nickname: string;
  gender: 'M' | 'F';
}

// 회원 가입
export const signup = (param: SignupParam) => {
  return api.post('/api/auth/user', param);
};

// 회원 존재 확인
export const checkEmail = (email: string) => {
  return api.get<boolean>(`/api/auth/help/user/${email}`);
};

// 이메일 코드 발송
export const requestVerificationEmail = (param: { email: string }) => {
  return api.post('/api/auth/request-verification-email-code', param);
};

// 이메일 코드 검증
export const verifyEmailCode = (param: { email: string; number: string }) => {
  return api.post('/api/auth/verify-email-code', param);
};
