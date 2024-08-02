import { ReactNode, useRef } from 'react';
import { api } from '../api/interceptors';
import { AccountData, addAccountByChat } from '../apis/accountApi';
import { addScheduleByChat, ScheduleData } from '../apis/scheduleApi';
import { apiFormatDateTime } from '../utils/dateUtils';

export type ChatType = 'chat' | 'schedule' | 'account';

export interface ChatMessageData {
  name: string;
  message: ReactNode;
  me: boolean;
  dateTime: string;
}

type EventCallback<T> = (data: T) => void;

const useChat = (server: string) => {
  const socketRef = useRef<WebSocket>();
  const accountRef = useRef<EventCallback<AccountData>>(() => {});
  const scheduleRef = useRef<EventCallback<ScheduleData>>(() => {});

  const connect = (
    onOpen: () => void,
    onError: () => void,
    onClose: () => void,
    onMessage: (data: object) => void,
    onAccount: EventCallback<AccountData>,
    onSchedule: EventCallback<ScheduleData>,
  ) => {
    accountRef.current = onAccount;
    scheduleRef.current = onSchedule;
    /*
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
    */
  };

  const send = async (type: ChatType, content: string, onSend: () => void) => {
    switch (type) {
      case 'chat': {
        onSend();
        await api.post('/chat/test', {
          assistant_id: 'asst_gzUHR2Orr2KnitbLKcoaU9q3',
          thread_id: 'thread_l57yNZOhonW5h2vOm8gkzhgw',
          chat_content: content,
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
    // console.log(
    //   await api.post('/chat/test', {
    //     assistant_id: 'asst_gzUHR2Orr2KnitbLKcoaU9q3',
    //     thread_id: 'thread_l57yNZOhonW5h2vOm8gkzhgw',
    //     chat_content: content,
    //   }),
    // );

    /*const socket = socketRef.current;

    // 지워야함
    onSend();

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    socket.send(JSON.stringify({ type, content }));
    onSend();*/
  };

  return { connect, send };
};

export default useChat;
