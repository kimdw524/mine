/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import Intro from './Intro';
import { containerCss, appBarCss, innerCss } from './style';
import styles from './CreateAvatar.module.css';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import Choice, { QuestionData } from './Choice';
import Subject, { SubjectiveQuestionData } from './Subject';
import ReadSentence from './ReadSentence';
import Done from './Done';

const questions: QuestionData[] = [
  {
    questionId: 1,
    description:
      '1. 여행을 좋아하나요? 좋아한다면, 주로 가고 싶은 여행지 유형은 무엇인가요?',
    choices: ['1번', '2번', '3번'],
  },
  {
    questionId: 2,
    description: '2. 2번 질문?',
    choices: ['10번', '20번', '30번'],
  },
  {
    questionId: 3,
    description: '3번 질문',
    choices: ['100번', '200번', '300번'],
  },
];

const subjectiveQuestions: SubjectiveQuestionData[] = [
  {
    questionId: 1,
    description:
      '1. 여행을 좋아하나요? 좋아한다면, 주로 가고 싶은 여행지 유형은 무엇인가요?',
  },
  {
    questionId: 2,
    description: '2. 2번 질문?',
  },
  {
    questionId: 3,
    description: '3번 질문',
  },
];

const CreateAvatar = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div css={containerCss}>
      <AppBar
        label="아바타 만들기"
        onBackClick={() => console.log('navigate to main')}
        css={appBarCss}
      >
        <AppBar.Progress value={step} max={3} />
      </AppBar>
      <div css={innerCss}>
        <TransitionAnimation
          data-key={step.toString()}
          className={{
            normal: styles.fade,
            enter: styles['fade-enter'],
            exit: styles['fade-exit'],
          }}
        >
          <Intro key={0} onCreateClick={() => setStep(1)} />
          <Choice key={1} items={questions} onSubmit={() => setStep(2)} />
          <Subject
            key={2}
            items={subjectiveQuestions}
            onSubmit={() => setStep(3)}
          />
          <ReadSentence key={3} onSubmit={() => setStep(4)} />
          <Done key={4} />
        </TransitionAnimation>
      </div>
    </div>
  );
};

export default CreateAvatar;
