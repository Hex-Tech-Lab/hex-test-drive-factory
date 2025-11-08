import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
};

export const lightTheme = createTheme(themeOptions);

export function createRTLTheme(baseTheme: ReturnType<typeof createTheme>) {
  return createTheme({
    ...baseTheme,
    direction: 'rtl',
  });
}
