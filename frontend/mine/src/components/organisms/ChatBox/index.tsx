/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { containerCss } from './style';

interface ChatBoxProps {
  children?: ReactNode;
}

const ChatBox = ({ children }: ChatBoxProps) => {
  return <div css={containerCss}>{children}</div>;
};

export default ChatBox;
