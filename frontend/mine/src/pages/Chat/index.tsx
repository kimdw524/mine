/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import {
  bottomCss,
  chatCss,
  chatInputCss,
  chatLogCss,
  containerCss,
} from './style';
import MenuBar from '../../components/organisms/MenuBar';
import { TextField } from 'oyc-ds';
import ChatBox from '../../components/organisms/ChatBox';
import ChatMessage from '../../components/molecules/ChatMessage';

const Chat = () => {
  const navigate = useNavigate();
  const [curMenu, setCurMenu] = useState<number>(0);

  return (
    <div css={containerCss}>
      <div>
        <AppBar label="채팅방" onBackClick={() => navigate('/')} />
      </div>
      <div css={chatLogCss}>
        <ChatBox>
          <ChatMessage name="AI 아바타" me={false}>
            asd
          </ChatMessage>
          <ChatMessage name="김다운" me={true}>
            안녕하세요.
          </ChatMessage>
          <ChatMessage name="김다운" me={true} animation>
            김다운입니다.
          </ChatMessage>
        </ChatBox>
      </div>
      <div css={chatCss}>
        {/* <Dropdown css={chatTypeCss}>
          <Dropdown.Item>채팅</Dropdown.Item>
          <Dropdown.Item>일정</Dropdown.Item>
          <Dropdown.Item>가계</Dropdown.Item>
        </Dropdown> */}
        <TextField
          label=""
          variant="outlined"
          defaultValue=""
          css={chatInputCss}
        />
      </div>
      <div css={bottomCss}>
        <MenuBar menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </div>
  );
};

export default Chat;
