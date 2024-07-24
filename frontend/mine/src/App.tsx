import React from 'react';
import Signup from './pages/Signup';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Login/Home';
import Login from './pages/Login/Login';
import Information from './pages/MyPage/Information';
import NickEdit from './pages/MyPage/EditUser/NickEdit';
import './App.css';
import PwdEdit from './pages/MyPage/EditUser/PwdEdit';
import CreateAvatar from './pages/CreateAvatar';
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

          {/* 마이페이지 */}
          <Route path="/mypage" element={<Information />} />
          <Route path="/mypage/nickname" element={<NickEdit />} />
          <Route path="/mypage/password" element={<PwdEdit />} />
          <Route path="/avatar/create" element={<CreateAvatar />} />
          <Route path="/findpassword" element={<FindPassword/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
