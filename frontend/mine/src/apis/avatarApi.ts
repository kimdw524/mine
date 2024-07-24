import axios from 'axios';

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
