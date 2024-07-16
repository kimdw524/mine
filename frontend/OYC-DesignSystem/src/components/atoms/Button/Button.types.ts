import { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  size?: Size;
  variant?: ButtonVariant;
  color?: Palette;
  disabled?: boolean;
  fullWidth?: boolean;
}
