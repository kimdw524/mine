import { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export interface IconButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  size?: Size;
  color?: Palette;
  circular?: boolean;
  disabled?: boolean;
}
