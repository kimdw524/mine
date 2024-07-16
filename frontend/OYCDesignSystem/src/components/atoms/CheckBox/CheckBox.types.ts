import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export interface CheckBoxProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  color?: Palette;
  size?: Size;
}
