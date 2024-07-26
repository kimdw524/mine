import { ToastVariant } from 'oyc-ds/dist/components/molecules/Toast/Toast.types';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { createContext } from 'react';

export interface INotiInfo {
  notiState: boolean;
  variant: ToastVariant;
  color: Palette;
  msg: string;
}

export interface INotification {
  notiInfo: INotiInfo;
}

export interface INotificationContext {
  info: INotiInfo;
  update: (newInfo: Partial<INotiInfo>) => void;
  handle: (variant: ToastVariant, color: Palette, msg: string) => void;
}

export const NotificationContext = createContext<INotificationContext>(
  {} as INotificationContext,
);
