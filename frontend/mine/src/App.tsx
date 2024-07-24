import React from 'react';
import Signup from './pages/Signup';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Login/Home';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage';
import './App.css';
import FindPassword from './pages/FindPassword';

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
          <Route path="/findpassword" element={<FindPassword/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
