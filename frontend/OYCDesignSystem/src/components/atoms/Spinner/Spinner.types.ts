import { ReactNode } from 'react';
import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export interface SpinnerProps extends React.ComponentProps<'div'> {
  size?: Size;
  color?: Palette;
}
