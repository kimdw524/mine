import { Palette } from '../../../themes/lightTheme';
import { Size } from '../../../themes/themeBase';

export type ProgressVariant = 'rounded' | 'rectangle';

export interface ProgressProps extends React.ComponentProps<'div'> {
  color?: Palette;
  value: number;
  max: number;
  variant?: ProgressVariant;
  transparentBackground?: boolean;
  size?: Size;
}
