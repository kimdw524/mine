import React, { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type MenuTabVariant = 'rounded' | 'rectangle';

export interface MenuTabProps
  extends Omit<React.ComponentProps<'div'>, 'size' | 'onChange'> {
  children: ReactNode[];
  size?: Size;
  color?: Palette;
  variant?: MenuTabVariant;
  onChangeMenu: (menu: number) => void;
}
