/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getQuestions,
  getSentences,
  getSubjectiveQuestions,
} from '../../apis/avatarApi';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import Choice from './Choice';
import styles from './CreateAvatar.module.css';
import Done from './Done';
import Intro from './Intro';
import ReadSentence from './ReadSentence';
import Subject from './Subject';

interface CreateAvatarFetchProps {
  step: number;
  onChangeStep: (step: number) => void;
}

const CreateAvatarFetch = ({ step, onChangeStep }: CreateAvatarFetchProps) => {
  const [questionQuery, subjectQuery, sentenceQuery] = useSuspenseQueries({
    queries: [
      { queryKey: ['avatar', 'questions'], queryFn: () => getQuestions() },
      {
        queryKey: ['avatar', 'subjects'],
        queryFn: () => getSubjectiveQuestions(),
      },
      { queryKey: ['avatar', 'sentences'], queryFn: () => getSentences() },
    ],
  });

  [questionQuery, subjectQuery, sentenceQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

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
        <Choice
          key={1}
          items={questionQuery.data.data}
          onSubmit={() => onChangeStep(2)}
        />
        <Subject
          key={2}
          items={subjectQuery.data.data}
          onSubmit={() => onChangeStep(3)}
        />
        <ReadSentence
          key={3}
          items={sentenceQuery.data.data}
          onSubmit={() => onChangeStep(4)}
        />
        <Done key={4} />
      </TransitionAnimation>
    </>
  );
};

export default CreateAvatarFetch;
