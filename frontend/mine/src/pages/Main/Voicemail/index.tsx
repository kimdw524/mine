/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Chat from '../Chat';
import { BackDrop, Typography, Button } from 'oyc-ds';
import {
  voicemodalCss,
  modaltitleCss,
  modalbtnCss,
  modalcancelCss,
  modalsendCss,
  modalwindowCss,
  modalcontentCss,
} from './style';
import Record from '../../CreateAvatar/ReadSentence/Record';

interface VoicecancelProps {
  onSubmit: () => void;
}

const Voicemail = ({ onSubmit }: VoicecancelProps) => {
  const [, setAudio] = useState<string>('');

  const handleRecord = (data: string) => {
    setAudio(data);
  };
  return (
    <div>
      <div
        style={{
          padding: '1rem',
        }}
      ></div>
      <BackDrop blur={0.4} opacity={0.4} css={voicemodalCss}>
        <div css={modalwindowCss}>
          <Typography
            color="dark"
            size="lg"
            weight="medium"
            css={modaltitleCss}
          >
            음성 메시지
          </Typography>
          <div css={modalcontentCss}>
            <Record onRecord={handleRecord} />
          </div>
          <div css={modalbtnCss}>
            <Button
              color="secondary"
              size="sm"
              variant="contained"
              css={modalcancelCss}
              onClick={onSubmit}
            >
              취소
            </Button>
            <Button
              color="primary"
              size="sm"
              variant="contained"
              css={modalsendCss}
            >
              보내기
            </Button>
          </div>
        </div>
      </BackDrop>
      <Chat />
    </div>
  );
};

export default Voicemail;
