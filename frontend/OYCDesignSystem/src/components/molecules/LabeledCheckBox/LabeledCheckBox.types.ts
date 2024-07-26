import { ReactNode } from 'react';
import { FontWeight, Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export interface LabeledCheckBoxProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  children: ReactNode;
  size?: Size;
  color?: Palette;
  labelColor?: Palette;
  weight?: FontWeight;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}
