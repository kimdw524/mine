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
