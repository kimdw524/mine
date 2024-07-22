import React from 'react';
import Signup from './pages/Signup';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <Signup />
        <MyPage />
      </ThemeProvider>
    </>
  );
}

export default App;
