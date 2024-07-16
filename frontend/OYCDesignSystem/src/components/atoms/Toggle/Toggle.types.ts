import { Palette } from '../../../themes/lightTheme';

export type ToggleVariant = 'contained';

export interface ToggleProps extends React.ComponentProps<'div'> {
  color?: Palette;
  value?: boolean;
}
