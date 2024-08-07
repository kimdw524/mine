import { ReactNode, useRef } from 'react';
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

const useChat = (server: string, avatarId: number) => {
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
    socketRef.current = new Client({
      webSocketFactory: () =>
        new SockJS(server, null, {
          transports: ['websocket', 'jsonp'],
        }),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    const socket = socketRef.current;

    socket.onConnect = (frame) => {
      onOpen();
      console.log('Connected: ' + frame);
      socket.subscribe(`/chat/${avatarId}`, (message) => {
        onMessage(JSON.parse(message.body));
      });
    };

    socket.onStompError = onError;
    socket.onWebSocketClose = onClose;

    socket.activate();

    accountRef.current = onAccount;
    scheduleRef.current = onSchedule;
  };

  const send = async (type: ChatType, content: string, onSend: () => void) => {
    switch (type) {
      case 'chat': {
        onSend();

        const socket = socketRef.current;
        if (!socket) {
          return;
        }
        socket.publish({
          destination: `/pub/${avatarId}`,
          body: JSON.stringify({
            chatContent: content,
            sendedAt: new Date().toJSON(),
          }),
        });
        break;
      }
      case 'account': {
        onSend();

        const result = await addAccountByChat({ query: content });
        accountRef.current(result.data);
        break;
      }
      case 'schedule': {
        onSend();

        const result = await addScheduleByChat({ query: content });
        scheduleRef.current(result.data);
        break;
      }
    }
  };

  return { connect, send };
};

export default useChat;
