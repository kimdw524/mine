import colorPalette from './colorPalette';

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Weight = 'light' | 'medium' | 'bold';

export type ThemeBaseType = {
  palette: Object;
  spacing: Record<Size, string>;
  borderRadius: Record<Size, string>;
  typography: {
    fontSize: Record<Size, string>;
    fontWeight: Record<Weight, number>;
  };
};

const ThemeBase: ThemeBaseType = {
  palette: colorPalette,
  spacing: {
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.25rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.625rem',
  },
  typography: {
    fontSize: {
      sm: '0.8125rem',
      md: '0.875rem',
      lg: '1rem',
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
