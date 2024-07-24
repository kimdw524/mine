/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Intro from './Intro';
import TransitionAnimation from '../../../components/common/TransitionAnimation';
import styles from './ReadSentence.module.css';
import Read from './Read';
import { SentenceData } from '../../../apis/avatarApi';

interface ReadSentenceProps {
  items: SentenceData[];
  onSubmit: () => void;
}

const ReadSentence = ({ items, onSubmit }: ReadSentenceProps) => {
  const [step, setStep] = useState<number>(0);

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
        <Intro key={0} onStartClick={() => setStep(1)} />
        <Read key={1} items={items} onSubmit={onSubmit}></Read>
      </TransitionAnimation>
    </>
  );
};

export default ReadSentence;
