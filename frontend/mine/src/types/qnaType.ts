export interface IChoice {
  questionChoiceId: number;
  number: number;
  description: string;
}

export interface IQuestion {
  questionId: number;
  num: number;
  description: string;
  type: string;
  questionChoiceList: IChoice[];
}

export interface IAnswer {
  questionResId: number;
  questionId: number;
  questionType: string;
  answer: number | string;
}

export interface INewAnswer {
  questionId: number;
  isNew: boolean;
  newAns: number | string;
}
