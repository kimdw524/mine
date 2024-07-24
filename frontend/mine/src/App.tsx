import React from 'react';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Login/Home';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage';
import Signup from './pages/Signup';
import CreateAvatar from './pages/CreateAvatar';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={LightTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/avatar/create" element={<CreateAvatar />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
