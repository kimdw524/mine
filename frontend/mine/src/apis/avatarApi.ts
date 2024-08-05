import axios from 'axios';
import { api } from './interceptors';

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

export interface NewAnsData {
  questionId: number;
  ansId: string | number;
}

export interface NewAnsListData {
  avatarId: number;
  anss: NewAnsData[];
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

/* 아바타 질문 응답 조회 */
export const getAvatarQuestionAnswer = (avatarId: number) => {
  return api({
    url: '/mypage/avatar/questions',
    method: 'get',
  });
};

/* 아바타 설문 조사 변경 */
export const updateAvatarChoice = (newChoices: NewAnsListData) => {
  return api({
    url: '/mypage/avatar/newchoice',
    method: 'patch',
    data: newChoices,
  });
};

/* 아바타 질의 응답 변경 */
export const updateAvatarSubjective = (newSubjectives: NewAnsListData) => {
  return api({
    url: '/mypage/avatar/subjective',
    method: 'patch',
    data: newSubjectives,
  });
};
