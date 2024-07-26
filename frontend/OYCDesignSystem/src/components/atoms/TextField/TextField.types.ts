import { Palette } from '../../../themes/lightTheme';

export type TextFieldVariant = 'contained' | 'outlined' | 'standard';

export interface TextFieldProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  color?: Palette;
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  maxRows?: number;
  multiLine?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  variant?: TextFieldVariant;
}
