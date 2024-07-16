import { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type DropdownVariant = 'contained' | 'outlined';

export interface DropdownProps
  extends Omit<React.ComponentProps<'div'>, 'size' | 'onChange'> {
  children: ReactNode;
  size?: Size;
  variant?: DropdownVariant;
  color?: Palette;
  name?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}
