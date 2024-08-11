/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MenuBar from '../../components/organisms/MenuBar';
import AppBar from '../../components/organisms/AppBar';
import Home from './Home';
import { containerCss, contentCss } from './style';
import MypageV2 from './MypageV2';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import useModal from '../../hooks/useModal';
import Calendar from '../Calendar';
import Chat from './Chat';

const Main = () => {
  const nav = useNavigate();
  const location = useLocation();
  const modal = useModal();
  const [curMenu, setCurMenu] = useState<number>(
    location.state?.step ? location.state.step : 1,
  );

  const handleCalendarClick = () => {
    modal.push({ component: <Calendar />, name: 'calendar' });
  };

  window.addEventListener('message', (e) => {
    const { url } = JSON.parse(e.data);
    const paths = url.parse('/');
    alert(paths);
  });

  return (
    <>
      <div css={containerCss}>
        <AppBar
          label={
            curMenu === 0
              ? '채팅방'
              : curMenu === 1
                ? '메인 화면'
                : '마이페이지'
          }
          menu={[
            {
              icon: <CalendarDaysIcon />,
              onClick: handleCalendarClick,
            },
          ]}
        />
        <div css={contentCss}>
          {[<Chat key={0} />, <Home key={1} />, <MypageV2 key={2} />][curMenu]}
        </div>
        <MenuBar menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </>
  );
};

export default Main;
