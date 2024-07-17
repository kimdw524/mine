import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type TextFieldVariant = 'contained' | 'outlined' | 'standard';

export interface TextFieldProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  color?: Palette;
  defaultValue?: string;
  disabled: boolean;
  label?: string;
  maxRows?: number;
  multiLine?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  size?: Size;
  type?: string;
  variant?: TextFieldVariant;
}
