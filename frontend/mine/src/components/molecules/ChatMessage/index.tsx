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
} from './style';
import { Typography } from 'oyc-ds';
import { ChatMessageData } from '../../../hooks/useChat';

interface ChatMessageProps extends Omit<ChatMessageData, 'message'> {
  children: ReactNode;
  animation?: boolean;
}

const ChatMessage = ({
  children,
  name,
  me,
  dateTime,
  animation = false,
}: ChatMessageProps) => {
  return (
    <div css={[containerCss, animation && animationCss]}>
      {!me && (
        <Typography size="sm" color="dark">
          {name}
        </Typography>
      )}
      <div css={[balloonCss, me && myBalloonCss]}>
        <div css={[messageCss, me ? myChatCss : opponentChatCss]}>
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
