import React from 'react';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import CreateAvatar from './pages/CreateAvatar';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <CreateAvatar />
      </ThemeProvider>
    </>
  );
}

export default App;
