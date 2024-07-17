import colorPalette from './colorPalette';
import ThemeBase, { ThemeBaseType } from './themeBase';

const LightTheme: ThemeType = {
  ...ThemeBase,
  colors: {
    primary: {
      main: colorPalette.purple.A700,
      contrastText: '#fff',
      hover: colorPalette.purple.A400,
      active: colorPalette.purple['400'],
      disabled: colorPalette.purple['100'],
    },
    secondary: {
      main: colorPalette.blueGrey.A700,
      contrastText: '#fff',
      hover: colorPalette.blueGrey['500'],
      active: colorPalette.blueGrey['800'],
      disabled: colorPalette.blueGrey.A200,
    },
    success: {
      main: colorPalette.blue['500'],
      contrastText: '#fff',
      hover: colorPalette.blue.A200,
      active: colorPalette.blue['800'],
      disabled: colorPalette.blue['200'],
    },
    danger: {
      main: colorPalette.red['500'],
      contrastText: '#fff',
      hover: colorPalette.red.A200,
      active: colorPalette.red['800'],
      disabled: colorPalette.red['200'],
    },
    dark: {
      main: '#000',
      contrastText: '#fff',
      hover: '#555',
      active: '#333',
      disabled: '#ccc',
    },
    light: {
      main: '#fff',
      contrastText: '#000',
      hover: '#f2f2f2',
      active: '#e4e4e4',
      disabled: '#eee',
    },
    text: {
      primary: '#000',
      secondary: colorPalette.blueGrey['700'],
      disabled: colorPalette.blueGrey.A100,
    },
    background: '#fff',
  },
};

export default LightTheme;

export interface TextPalette {
  primary: string;
  secondary: string;
  disabled: string;
}
export type Palette =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'dark'
  | 'light';
export type PaletteColor = {
  [key in 'main' | 'contrastText' | 'hover' | 'active' | 'disabled']: string;
};
export interface ThemeType extends ThemeBaseType {
  colors: {
    background: string;
    text: TextPalette;
  } & {
    [key in Palette]: PaletteColor;
  };
}

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
