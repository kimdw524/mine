/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  AvatarData,
  CreateAvatarRequest,
  QuestionAnswer,
  SentenceData,
  VoiceFile,
  createAvatar,
  getQuestions,
} from '../../apis/avatarApi';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import Question from './Question';
import styles from './CreateAvatar.module.css';
import Done from './Done';
import Intro from './Intro';
import ReadSentence from './ReadSentence';
import Infor from './Infor';
import SelectAvatar from './SelectAvatar';
import useDialog from '../../hooks/useDialog';

interface CreateAvatarFetchProps {
  step: number;
  onChangeStep: (step: number) => void;
}

const setences: SentenceData[] = [
  {
    sentenceId: 1,
    description:
      '이 목소리는 녹음자 본인의 목소리이며, 녹음한 음성을 인공지능 목소리 생성 목적으로 사용하는 데 동의합니다.',
  },
  {
    sentenceId: 2,
    description:
      '안녕하세요. 좋은 아침입니다! 오늘은 햇빛이 아주 강한 것 같아요.',
  },
  {
    sentenceId: 3,
    description:
      '저는 봄, 여름, 가을, 겨울 중에 여름을 가장 좋아하는 데, 여러분은 어떤 계절을 가장 좋아하시나요?',
  },
  {
    sentenceId: 4,
    description: '여러분들은 어떤 장르의 노래를 즐겨 들으시나요?',
  },
  {
    sentenceId: 5,
    description:
      '나와 다르게 해외 여행보다 국내 여행을 더 선호하는 사람들도 많던데 너는 어때?',
  },
];

const CreateAvatarFetch = ({ step, onChangeStep }: CreateAvatarFetchProps) => {
  const { alert } = useDialog();
  const requestRef = useRef<CreateAvatarRequest>({
    avatarName: '',
    residence: '',
    job: '',
    questionResList: [],
    voiceFileList: [],
    avatarModel: 'cow',
  });
  const questionQuery = useSuspenseQuery({
    queryKey: ['avatar', 'questions'],
    queryFn: () => getQuestions(),
  });
  const { mutate } = useMutation({
    mutationFn: (data: CreateAvatarRequest) => createAvatar(data),
    onSuccess: (data) => {
      if (data.status === 200) {
        onChangeStep(5);
      }
    },
    onError: (error) => {
      alert('오류가 발생하였습니다.');
      console.error(error);
    },
  });

  if (questionQuery.error && !questionQuery.isFetching) {
    throw questionQuery.error;
  }

  const handleQuestion = (result: QuestionAnswer[]) => {
    requestRef.current.questionResList = result;
    onChangeStep(2);
  };

  const handleReadSentence = (result: VoiceFile[]) => {
    requestRef.current.voiceFileList = result;
    onChangeStep(3);
  };

  const handleSelectAvatar = (result: string) => {
    requestRef.current.avatarModel = result;
    onChangeStep(4);
  };

  const handleInfor = (result: Omit<AvatarData, 'avatarModel'>) => {
    requestRef.current = { ...requestRef.current, ...result };
    mutate(requestRef.current);
  };

  return (
    <>
      <TransitionAnimation
        data-key={step.toString()}
        className={{
          normal: styles.fade,
          enter: styles['fade-enter'],
          exit: styles['fade-exit'],
        }}
      >
        <Intro key={0} onCreateClick={() => onChangeStep(1)} />
        <Question
          key={1}
          items={questionQuery.data.data}
          onSubmit={handleQuestion}
        />
        <ReadSentence key={2} items={setences} onSubmit={handleReadSentence} />
        <SelectAvatar key={3} onSubmit={handleSelectAvatar} />
        <Infor key={4} onSubmit={handleInfor} />
        <Done key={5} />
      </TransitionAnimation>
    </>
  );
};

export default CreateAvatarFetch;
