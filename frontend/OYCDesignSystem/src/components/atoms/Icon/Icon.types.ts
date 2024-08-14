import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export interface IconProps extends React.ComponentProps<'span'> {
  color?: Palette;
  size?: Size;
}
