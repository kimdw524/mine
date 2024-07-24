import { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type BackDropVariant = 'contained' | 'outlined';

export interface BackDropProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  size?: Size;
  variant?: BackDropVariant;
  color?: Palette;
  disabled?: boolean;
  fullWidth?: boolean;
}
