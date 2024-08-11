/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';
import { ChatMessageData } from '../../../hooks/useChat';
import ChatMessage from '../../molecules/ChatMessage';

interface ChatBoxProps {
  messages: ChatMessageData[];
  voiceId: string;
}

const ChatBox = ({ messages, voiceId }: ChatBoxProps) => {
  return (
    <div css={containerCss}>
      {messages.map(({ name, message, me, dateTime }, index) => (
        <ChatMessage
          key={index}
          name={name}
          me={me}
          dateTime={dateTime}
          animation
          voiceId={voiceId}
          speech={!me && typeof message === 'string'}
        >
          {message}
        </ChatMessage>
      ))}
    </div>
  );
};

export default ChatBox;
