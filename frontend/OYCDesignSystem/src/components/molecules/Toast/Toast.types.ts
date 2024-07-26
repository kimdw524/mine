import { ReactNode } from 'react';
import { Palette } from '../../../themes/lightTheme';

export type ToastVariant = 'contained' | 'filled' | 'outlined';

export interface ToastProps extends React.ComponentProps<'div'> {
  children: ReactNode;
  variant?: ToastVariant;
  color?: Palette;
}
