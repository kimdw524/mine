/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Intro from './Intro';
import TransitionAnimation from '../../../components/common/TransitionAnimation';
import styles from './ReadSentence.module.css';

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
        <div key={1}>asdsad</div>
      </TransitionAnimation>
    </>
  );
};

export default ReadSentence;
