/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import {
  animationCss,
  containerCss,
  messageCss,
  myChatContainerCss,
  myChatCss,
} from './style';
import { Typography } from 'oyc-ds';

interface ChatMessageProps {
  children: ReactNode;
  name: string;
  me: boolean;
  animation?: boolean;
}

const ChatMessage = ({
  children,
  name,
  me,
  animation = false,
}: ChatMessageProps) => {
  return (
    <div
      css={[containerCss, me && myChatContainerCss, animation && animationCss]}
    >
      <Typography size="sm" color="dark">
        {name}
      </Typography>
      <div css={[messageCss, me && myChatCss]}>{children}</div>
    </div>
  );
};

export default ChatMessage;
