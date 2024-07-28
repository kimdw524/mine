import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type ToggleVariant = 'contained';

export interface ToggleProps
  extends Omit<React.ComponentProps<'div'>, 'onClick'> {
  color?: Palette;
  size?: Size;
  onClick?: (checked: boolean) => void;
}
