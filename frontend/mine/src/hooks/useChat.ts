import { useRef } from 'react';

export type ChatType = 'chat' | 'schedule' | 'account';

export interface ChatMessageData {
  name: string;
  message: string;
  me: boolean;
  dateTime: string;
}

const useChat = (server: string) => {
  const socketRef = useRef<WebSocket>();

  const connect = (
    onOpen: () => void,
    onError: () => void,
    onClose: () => void,
    onMessage: (data: object) => void,
  ) => {
    socketRef.current = new WebSocket(server);

    const socket = socketRef.current;

    socket.addEventListener('close', () => {
      onClose();
    });

    socket.addEventListener('error', () => {
      onError();
    });

    socket.addEventListener('message', (e) => {
      onMessage(JSON.parse(e.data));
    });

    socket.addEventListener('open', () => {
      onOpen();
    });
  };

  const send = async (type: ChatType, content: string, onSend: () => void) => {
    const socket = socketRef.current;

    // 지워야함
    onSend();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    socket.send(JSON.stringify({ type, content }));
    onSend();
  };

  return { connect, send };
};

export default useChat;
