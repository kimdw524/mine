/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { bottomCss, chatCss, chatLogCss, containerCss } from './style';
import MenuBar from '../../components/organisms/MenuBar';
import ChatBox from '../../components/organisms/ChatBox';
import useChat, { ChatMessageData, ChatType } from '../../hooks/useChat';
import ChatTextField from '../../components/molecules/ChatTextField';

const Chat = () => {
  const navigate = useNavigate();
  const [curMenu, setCurMenu] = useState<number>(0);
  const chatRef = useRef<HTMLInputElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const [chatLog, setChatLog] = useState<ChatMessageData[]>([]);
  const chatTypeRef = useRef<ChatType>('chat');

  const chat = useChat('ws://127.0.0.1:3001');

  const addChat = (data: ChatMessageData) => {
    setChatLog((chatLog) => [...chatLog, data]);
  };

  const handleChatSend = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !chatRef.current || !chatRef.current.value.trim())
      return;

    const message = chatRef.current.value;

    chat.send(chatTypeRef.current, message, () => {
      addChat({ me: true, message, name: '나', dateTime: new Date().toJSON() });

      setTimeout(() => {
        addChat({
          me: false,
          message,
          name: '김',
          dateTime: new Date().toJSON(),
        });
      }, 1000);

      if (chatRef.current) {
        chatRef.current.value = '';
      }
    });
  };

  useEffect(() => {
    if (!chatLogRef.current) {
      return;
    }

    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [chatLog, chatLogRef]);

  useEffect(() => {
    const handleOpen = () => {
      console.log('연결됨');
    };

    const handleError = () => {
      console.log('오류뜸');
    };

    const handleClose = () => {
      console.log('연결 끊김');
    };

    const handleMessage = (data: object) => {
      console.log(data);
    };

    chat.connect(handleOpen, handleError, handleClose, handleMessage);
  }, []);

  return (
    <div css={containerCss}>
      <div>
        <AppBar
          label="채팅방"
          onBackClick={() => navigate('/')}
          onMenuClick={() => {}}
        />
      </div>
      <div css={chatLogCss} ref={chatLogRef}>
        <ChatBox messages={chatLog} />
      </div>
      <div css={chatCss}>
        <ChatTextField
          ref={chatRef}
          onKeyDown={handleChatSend}
          onTypeChange={(type) => {
            chatTypeRef.current = type;
          }}
        />
      </div>
      <div css={bottomCss}>
        <MenuBar menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </div>
  );
};

export default Chat;
