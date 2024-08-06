import { api } from './interceptors';

export interface QuestionChoice {
  questionChoiceId: number;
  number: number;
  description: string;
}

export interface QuestionData {
  questionId: number;
  num: number;
  description: string;
  type: 'c' | 's';
  questionChoiceList: QuestionChoice[];
}

export interface SentenceData {
  sentenceId: number;
  description: string;
}

// <!-- 아바타 생성 관련 타입

export interface AvatarData {
  avatarName: string;
  residence: string;
  job: string;
  avatarModel: string;
}

export interface QuestionAnswer {
  questionId: number;
  questionChoiceId: number | null;
  subjectiveAns: string | null;
}

export interface VoiceFile {
  file: string;
  fileName: string;
  fileExtension: string;
}

export interface CreateAvatarRequest extends AvatarData {
  questionResList: QuestionAnswer[];
  voiceFileList: VoiceFile[];
}

// -->

export interface NewAnsData {
  questionId: number;
  ansId: string | number;
}

export interface NewAnsListData {
  avatarId: number;
  anss: NewAnsData[];
}

export const getQuestions = () => {
  return api.get<QuestionData[]>('/api/question');
};

export const createAvatar = (param: CreateAvatarRequest) => {
  return api.post('/api/avatars', param);
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
