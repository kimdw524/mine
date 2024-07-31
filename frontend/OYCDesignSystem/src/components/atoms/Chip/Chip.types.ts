import { Size } from '../../../themes/themeBase';

export interface ChipProps extends React.ComponentProps<'span'> {
  color?: string;
  fill?: string;
  size?: Size;
}
