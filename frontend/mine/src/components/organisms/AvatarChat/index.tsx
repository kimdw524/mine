/** @jsxImportSource @emotion/react */
import { TextField, Typography } from 'oyc-ds';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { chatCss, containerCss, waitCss } from './style';
import useChat, { ChatResponse } from '../../../hooks/useChat';
import { avatarTTS } from '../../../apis/avatarApi';
import useDialog from '../../../hooks/useDialog';

interface AvatarChatProps {
  avatarId: number;
  voiceId: string;
  voice: boolean;
  onTTSPendingChange: (state: boolean) => void;
}

const AvatarChat = ({
  avatarId,
  voiceId,
  voice,
  onTTSPendingChange,
}: AvatarChatProps) => {
  const { connect, getLog, send } = useChat(avatarId);
  const chatRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ReactNode>(undefined);
  const [request, setRequest] = useState<string | undefined>(undefined);
  const { alert } = useDialog();

  const voiceRef = useRef<{ active: boolean; voiceId: string }>({
    active: voice,
    voiceId,
  });

  useEffect(() => {
    voiceRef.current = { active: voice, voiceId };
  }, [voiceRef, voice, voiceId]);

  const getRecentChat = (me: boolean) =>
    getLog()
      .reverse()
      .find((item) => item.me === me && item.avatarId === avatarId);

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

  useEffect(() => {
    const handleOpen = () => {};

    const handleError = () => {};

    const handleClose = () => {};

    const handleMessage = (res: ChatResponse) => {
      setResponse(res.text);

      if (!voiceRef.current.active) {
        return;
      }

      onTTSPendingChange(true);

      avatarTTS(voiceRef.current.voiceId, res.text)
        .then((result) => {
          new Audio(window.URL.createObjectURL(result.data)).play();
        })
        .catch(() => {
          alert('오류로 인해 TTS를 재생하지 못했습니다.');
        })
        .finally(() => {
          onTTSPendingChange(false);
        });
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
