import React, { useCallback, useState } from 'react';
import Signup from './pages/Signup';
import { LightTheme } from 'oyc-ds';
import { ThemeProvider } from '@emotion/react';
import { UserProvider } from './pages/Login/UserContext';
import { ModalProvider } from './hooks/useModal';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastVariant } from 'oyc-ds/dist/components/molecules/Toast/Toast.types';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { INotiInfo, NotificationContext } from './utils/NotificationContext';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import Login from './pages/Login/Login';
import CreateAvatar from './pages/CreateAvatar';
import FindPassword from './pages/FindPassword';
import Main from './pages/Main';
import Notification from './components/common/Notification';
import Schedule from './pages/Schedule';
import Account from './pages/Account';
import AccountChart from './pages/Statistics/Account/index';
import ScheduleChart from './pages/Statistics/Schedule/index';
import NickEdit from './pages/Main/MypageV2/EditUser/NickEdit';
import PwdEdit from './pages/Main/MypageV2/EditUser/PwdEdit';
import Achievement from './pages/Main/MypageV2/Achievement';
import AvatarInfo from './pages/Main/MypageV2/AvatarInfo';
import AvatarInfoEdit from './pages/Main/MypageV2/EditAvatar/AvatarInfoEdit';
import AvatarQnAEdit from './pages/Main/MypageV2/EditAvatar/AvatarQnAEdit';

function App() {
  const nav = useNavigate();
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
          <ModalProvider>
            <NotificationContext.Provider
              value={{
                info: notiInfo,
                update: updateInfo,
                handle: handleNoti,
              }}
            >
              {notiInfo.notiState && <Notification notiInfo={notiInfo} />}
              <Routes>
                {/* 메인 화면 */}
                <Route path="/" element={<Main />} />

                {/* 회원 인증 / 인가 */}
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/signup" element={<Signup />} />
                <Route path="/user/findpassword" element={<FindPassword />} />

                <Route path="/chart/account" element={<AccountChart />} />
                <Route path="/chart/schedule" element={<ScheduleChart />} />

                {/* 마이페이지 */}
                <Route path="/mypage/nick" element={<NickEdit />} />
                <Route path="/mypage/pwd" element={<PwdEdit />} />
                <Route path="/mypage/achievement" element={<Achievement />} />
                <Route path="/mypage/avatar" element={<AvatarInfo />} />
                <Route
                  path="/mypage/avatar/info"
                  element={<AvatarInfoEdit />}
                />
                <Route path="/mypage/avatar/qna" element={<AvatarQnAEdit />} />

                <Route path="/avatar/create" element={<CreateAvatar />} />

                <Route path="/schedule" element={<Schedule />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </NotificationContext.Provider>
          </ModalProvider>
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
