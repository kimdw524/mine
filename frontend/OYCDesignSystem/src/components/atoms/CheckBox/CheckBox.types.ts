import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type CheckBoxVariant = 'outlined';

export interface CheckBoxProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: CheckBoxVariant;
  color?: Palette;
  size?: Size;
}
