import { ReactNode, useEffect, useRef } from 'react';
import { AccountData, addAccountByChat } from '../apis/accountApi';
import { addScheduleByChat, ScheduleData } from '../apis/scheduleApi';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export type ChatType = 'chat' | 'schedule' | 'account';

export interface ChatMessageData {
  name: string;
  message: ReactNode;
  me: boolean;
  dateTime: string;
  avatarId?: number;
  type: ChatType;
  data: object | null;
}

export interface ChatResponse {
  avatarId: number;
  avatarName: string;
  role: string;
  sendedDate: string;
  text: string;
}

interface ChatEventHandler {
  onOpen: () => void;
  onError: () => void;
  onClose: () => void;
  onMessage: (message: ChatResponse) => void;
  onAccount: EventCallback<AccountData>;
  onSchedule: EventCallback<ScheduleData>;
}

type EventCallback<T> = (data: T) => void;

const useChat = (
  avatarId: number,
  server: string = 'https://i11d106.p.ssafy.io/chat/stomp/chat',
) => {
  const accountRef = useRef<EventCallback<AccountData>>(() => {});
  const scheduleRef = useRef<EventCallback<ScheduleData>>(() => {});
  const socketRef = useRef<Client>();
  const connect = ({
    onOpen,
    onError,
    onClose,
    onMessage,
    onAccount,
    onSchedule,
  }: ChatEventHandler) => {
    accountRef.current = onAccount;
    scheduleRef.current = onSchedule;

    if (avatarId !== -1) {
      socketRef.current = new Client({
        webSocketFactory: () =>
          new SockJS(server, null, {
            transports: ['websocket', 'jsonp'],
          }),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
    }
    const socket = socketRef.current;

    if (!socket) {
      return;
    }

    socket.onConnect = () => {
      onOpen();
      socket.subscribe(`/chat/${avatarId}`, (message) => {
        const data: ChatResponse = JSON.parse(message.body);

        addLog({
          me: false,
          name: data.avatarName,
          message: data.text,
          dateTime: data.sendedDate,
          avatarId,
          type: 'chat',
          data: null,
        });
        onMessage(data);
      });
    };

    socket.onWebSocketError = onError;
    socket.onWebSocketClose = onClose;

    socket.activate();
  };

  const addLog = (data: ChatMessageData) => {
    const log: ChatMessageData[] = getLog();
    log.push(data);
    localStorage.setItem('chatLog2', JSON.stringify(log.slice(-30)));
  };

  const getLog = (): ChatMessageData[] => {
    return (
      JSON.parse(localStorage.getItem('chatLog2') ?? '[]') as ChatMessageData[]
    ).filter((message) => message.avatarId === avatarId);
  };

  const send = async (type: ChatType, content: string, onSend: () => void) => {
    const date = new Date().toJSON();

    switch (type) {
      case 'chat': {
        const socket = socketRef.current;

        if (!socket) {
          return;
        }

        try {
          socket.publish({
            destination: `/pub/${avatarId}`,
            body: JSON.stringify({
              chatContent: content,
              sendedAt: date,
            }),
          });
          addLog({
            me: true,
            name: '나',
            message: content,
            dateTime: date,
            avatarId,
            type: 'chat',
            data: null,
          });
          onSend();
        } catch (error) {
          socket.onWebSocketError('');
        }

        break;
      }
      case 'account': {
        addLog({
          me: true,
          name: '나',
          message: content,
          dateTime: date,
          avatarId,
          type: 'account',
          data: null,
        });
        onSend();

        const result = await addAccountByChat({ query: content });
        accountRef.current(result.data);
        addLog({
          me: false,
          name: '',
          message: content,
          dateTime: date,
          avatarId,
          type: 'account',
          data: result.data,
        });
        break;
      }
      case 'schedule': {
        addLog({
          me: true,
          name: '나',
          message: content,
          dateTime: date,
          avatarId,
          type: 'schedule',
          data: null,
        });
        onSend();

        const result = await addScheduleByChat({ query: content });
        scheduleRef.current(result.data);
        addLog({
          me: false,
          name: '',
          message: content,
          dateTime: date,
          avatarId,
          type: 'schedule',
          data: result.data,
        });
        break;
      }
    }
  };

  useEffect(() => {
    return () => {
      const socket = socketRef.current;
      socket?.deactivate();
    };
  }, []);

  return { connect, send, getLog, avatarId };
};

export default useChat;
