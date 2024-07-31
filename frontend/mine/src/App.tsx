import React, { useCallback, useState } from 'react';
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
import Main from './pages/Main/Main';
import Notification from './components/common/Notification';
import { ToastVariant } from 'oyc-ds/dist/components/molecules/Toast/Toast.types';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { INotiInfo, NotificationContext } from './utils/NotificationContext';
import Schedule from './pages/Schedule';
import { UserProvider } from './pages/Login/UserContext';

function App() {
  const [notiInfo, setNotiInfo] = useState<INotiInfo>({
    notiState: false,
    variant: 'contained',
    color: 'primary',
    msg: '',
  });

  const updateInfo = useCallback((newInfo: Partial<INotiInfo>) => {
    setNotiInfo((info) => {
      return { ...info, ...newInfo };
    });
  }, []);

  const handleNoti = useCallback(
    (variant: ToastVariant, color: Palette, msg: string) => {
      updateInfo({
        notiState: true,
        variant: variant,
        color: color,
        msg: msg,
      });
      setTimeout(() => {
        updateInfo({
          notiState: false,
        });
      }, 2000);
    },
    [],
  );

  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <ThemeProvider theme={LightTheme}>
          <NotificationContext.Provider
            value={{
              info: notiInfo,
              update: updateInfo,
              handle: handleNoti,
            }}
          >
            {notiInfo.notiState && <Notification notiInfo={notiInfo} />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/signup" element={<Signup />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/main" element={<Main />} />

              {/* 마이페이지 */}
              <Route path="/mypage" element={<Information />} />
              <Route path="/mypage/nickname" element={<NickEdit />} />
              <Route path="/mypage/password" element={<PwdEdit />} />
              <Route path="/avatar/create" element={<CreateAvatar />} />
              <Route path="/findpassword" element={<FindPassword />} />

              <Route path="/schedule" element={<Schedule />} />
            </Routes>
          </NotificationContext.Provider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
