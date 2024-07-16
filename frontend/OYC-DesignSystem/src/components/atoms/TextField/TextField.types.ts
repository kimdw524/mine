import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type TextFieldVariant = 'outlined';

export interface TextFieldProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: TextFieldVariant;
  color?: Palette;
  size?: Size;
  placeholder?: string;
  error?: boolean;
}
