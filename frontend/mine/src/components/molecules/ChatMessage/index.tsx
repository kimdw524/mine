/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import {
  animationCss,
  balloonCss,
  containerCss,
  dateTimeCss,
  messageCss,
  myBalloonCss,
  myChatCss,
  opponentChatCss,
  speechCss,
} from './style';
import { Icon, Typography } from 'oyc-ds';
import { ChatMessageData } from '../../../hooks/useChat';
import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { avatarTTS } from '../../../apis/avatarApi';
import useDialog from '../../../hooks/useDialog';

interface ChatMessageProps extends Omit<ChatMessageData, 'message'> {
  children: ReactNode;
  animation?: boolean;
  speech?: boolean;
}

const ChatMessage = ({
  children,
  name,
  me,
  dateTime,
  animation = false,
  speech = false,
}: ChatMessageProps) => {
  const { alert } = useDialog();
  const handleTTSClick = (message: string) => {
    avatarTTS('pMsXgVXv3BLzUgSXRplE', message)
      .then((result) => {
        new Audio(window.URL.createObjectURL(result.data)).play();
      })
      .catch(() => {
        alert('오류로 인해 TTS를 재생하지 못했습니다.');
      });
  };

  return (
    <div css={[containerCss, animation && animationCss]}>
      {!me && (
        <Typography size="sm" color="dark">
          {name}
        </Typography>
      )}
      <div css={[balloonCss, me && myBalloonCss]}>
        <div
          css={[messageCss, me ? myChatCss : opponentChatCss]}
          onClick={() => {
            speech && handleTTSClick(children?.toString() || '');
          }}
        >
          {speech && (
            <Icon size="sm" css={speechCss}>
              <SpeakerWaveIcon />
            </Icon>
          )}
          {children}
        </div>
        <div css={dateTimeCss}>
          <Typography color="secondary" size="xs" weight="medium">
            {new Date(dateTime).toLocaleString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
