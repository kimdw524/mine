import React, { ReactNode } from 'react';
import { Size } from '../../../themes/themeBase';
import { Palette } from '../../../themes/lightTheme';

export type MenuTabBorder = 'rounded' | 'rectangle';
export type MenuTabVariant = 'contained' | 'outlined';

export interface MenuTabProps
  extends Omit<React.ComponentProps<'div'>, 'size' | 'onChange'> {
  children: ReactNode[];
  size?: Size;
  variant?: MenuTabVariant;
  color?: Palette;
  border?: number;
  onChangeMenu: (menu: number) => void;
}
