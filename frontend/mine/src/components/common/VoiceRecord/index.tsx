/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { containerCss, modalCss } from './style';
import { useNavigate } from 'react-router-dom';
import useUserAudio from '../../../hooks/useUserAudio';
import useDialog from '../../../hooks/useDialog';
import RecordButton from '../../molecules/RecordButton';

interface VoiceRecordProps {
  onSuccess: (data: string) => void;
}

const VoiceRecord = ({ onSuccess }: VoiceRecordProps) => {
  const navigate = useNavigate();
  const userAudio = useUserAudio();
  const { alert } = useDialog();

  const handleClick = () => {
    userAudio
      .stop()
      .then((result) => {
        onSuccess((result as string).split('data:audio/webm;base64,')[1]);
      })
      .catch(() => {
        alert('오류가 발생하여 녹음을 하지 못했습니다.');
      });
  };

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    userAudio.record();
  }, []);

  return (
    <div css={modalCss} onClick={handleClose}>
      <div css={containerCss}>
        <RecordButton active={true} onClick={handleClick}></RecordButton>
      </div>
    </div>
  );
};

export default VoiceRecord;
