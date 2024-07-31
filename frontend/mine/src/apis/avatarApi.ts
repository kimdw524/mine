import axios from 'axios';
import { api } from '../api/interceptors';

export interface QuestionData {
  questionId: number;
  description: string;
  choices: string[];
}

export interface SubjectiveQuestionData {
  questionId: number;
  description: string;
}

export interface SentenceData {
  sentenceId: number;
  description: string;
}

export const getQuestions = () => {
  return axios.get<QuestionData[]>('/avatar/questions');
};

export const getSubjectiveQuestions = () => {
  return axios.get<SubjectiveQuestionData[]>('/avatar/subjectives');
};

export const getSentences = () => {
  return axios.get<SentenceData[]>('/avatar/sentences');
};

/* 아바타 정보 조회 */
export const getAvatarInfo = () => {
  return api({
    url: '/mypage/avatar',
    method: 'get',
  });
};

/* 아바타 직업 변경 */
export const changeAvatarJob = (id: number, newJob: string) => {
  return api({
    url: '/mypage/avatar/job',
    method: 'patch',
    data: {
      id: id,
      newJob: newJob,
    },
  });
};

/* 아바타 이름 변경 */
export const changeAvatarName = (id: number, newName: string) => {
  return api({
    url: '/mypage/avatar/name',
    method: 'patch',
    data: {
      id: id,
      newName: newName,
    },
  });
};

/* 아바타 거주지 변경 */
export const changeAvatarPlace = (id: number, newPlace: string) => {
  return api({
    url: '/mypage/avatar/place',
    method: 'patch',
    data: {
      id: id,
      newName: newPlace,
    },
  });
};

/* 아바타 질문 응답 조회 */
export const getAvatarQuestionAnswer = (avatarId: number) => {
  return api({
    url: '/mypage/avatar/questions',
    method: 'get',
  });
};
