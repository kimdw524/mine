/** @jsxImportSource @emotion/react */
import { Spinner, TextField, Typography } from 'oyc-ds';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { chatCss, containerCss, waitCss } from './style';
import useChat, { ChatResponse } from '../../../hooks/useChat';

interface AvatarChatProps {
  avatarId: number;
}

const AvatarChat = ({ avatarId }: AvatarChatProps) => {
  const { connect, getLog, send } = useChat(avatarId);
  const chatRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ReactNode>(undefined);
  const [request, setRequest] = useState<string | undefined>(undefined);

  const getRecentChat = (me: boolean) =>
    getLog()
      .reverse()
      .find((item) => item.me === me);

  useEffect(() => {
    const handleOpen = () => {};

    const handleError = () => {};

    const handleClose = () => {};

    const handleMessage = (res: ChatResponse) => {
      setResponse(res.text);
    };

    connect({
      onOpen: handleOpen,
      onError: handleError,
      onClose: handleClose,
      onMessage: handleMessage,
      onAccount: () => {},
      onSchedule: () => {},
    });

    setResponse(getRecentChat(false)?.message?.toString());
    setRequest(getRecentChat(true)?.message?.toString());
  }, []);

  const handleChatSend = (e: React.KeyboardEvent) => {
    if (
      e.key !== 'Enter' ||
      !chatRef.current ||
      !chatRef.current.value.trim()
    ) {
      return;
    }

    const message = chatRef.current.value;

    send('chat', message, () => {
      if (!chatRef.current) {
        return;
      }

      setResponse(<div css={waitCss}>아바타가 대답을 생각 중이에요.</div>);

      setRequest(chatRef.current.value);
      chatRef.current.value = '';
    });
  };

  return (
    <div css={containerCss}>
      <Typography color="dark" size="md">
        {response ?? '안녕!'}
      </Typography>
      <TextField
        variant="standard"
        label=""
        placeholder={request ?? '내 비서와 대화를 해보세요.'}
        css={chatCss}
        ref={chatRef}
        defaultValue=""
        onKeyDown={handleChatSend}
      />
    </div>
  );
};

export default React.memo(AvatarChat);
