import colorPalette from './colorPalette';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type FontWeight = 'light' | 'medium' | 'bold';

export type ThemeBaseType = {
  palette: Object;
  typography: {
    fontSize: Record<FontSize, string>;
    fontWeight: Record<FontWeight, number>;
  };
};

const ThemeBase: ThemeBaseType = {
  palette: colorPalette,
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      light: 300,
      medium: 500,
      bold: 700,
    },
  },
};

export default ThemeBase;
