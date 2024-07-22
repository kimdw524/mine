import React from 'react';
import Signup from './pages/Signup';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import MyPage from './pages/MyPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
