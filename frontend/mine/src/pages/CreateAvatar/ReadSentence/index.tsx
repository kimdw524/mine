/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Intro from './Intro';
import TransitionAnimation from '../../../components/common/TransitionAnimation';
import styles from './ReadSentence.module.css';
import Read from './Read';

interface ReadSentenceProps {
  onSubmit: () => void;
}

const ReadSentence = ({ onSubmit }: ReadSentenceProps) => {
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
        <Read
          key={1}
          items={['가나다라마바사아자차카타파하', 'ABCDEFGHIJKLNMOP1234567890']}
          onSubmit={onSubmit}
        ></Read>
      </TransitionAnimation>
    </>
  );
};

export default ReadSentence;
