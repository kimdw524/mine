import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type ToggleVariant = 'contained';

export interface ToggleProps extends React.ComponentProps<'div'> {
  color?: Palette;
  size?: Size;
}
