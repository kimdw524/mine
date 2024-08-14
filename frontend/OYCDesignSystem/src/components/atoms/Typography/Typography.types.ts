import { Palette } from '../../../themes/lightTheme';
import { FontSize, FontWeight } from '../../../themes/themeBase';

export interface TypographyProps extends React.ComponentProps<'div'> {
  color?: Palette;
  size?: FontSize;
  weight?: FontWeight;
}
