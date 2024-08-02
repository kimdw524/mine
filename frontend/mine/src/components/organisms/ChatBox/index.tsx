/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss } from './style';
import { ChatMessageData } from '../../../hooks/useChat';
import ChatMessage from '../../molecules/ChatMessage';

interface ChatBoxProps {
  messages: ChatMessageData[];
}

const ChatBox = ({ messages }: ChatBoxProps) => {
  return (
    <div css={containerCss}>
      {messages.map(({ name, message, me, dateTime }, index) => (
        <ChatMessage
          key={index}
          name={name}
          me={me}
          dateTime={dateTime}
          animation
        >
          {message}
        </ChatMessage>
      ))}
    </div>
  );
};

export default ChatBox;
