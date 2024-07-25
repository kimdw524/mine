/** @jsxImportSource @emotion/react */
import React from 'react';
import { TextField } from 'oyc-ds';
import { chatbarCss } from './style';

const Chat = () => {
  return (
    <div>
      <TextField
        color="primary"
        defaultValue=""
        label=""
        maxRows={10}
        placeholder="메시지를 입력하세요."
        type="text"
        variant="outlined"
        css={chatbarCss}
      />
      
    </div>
  );
};

export default Chat;
