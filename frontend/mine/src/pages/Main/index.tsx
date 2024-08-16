/** @jsxImportSource @emotion/react */
import React, { createContext, useCallback, useRef, useState } from 'react';
import MenuBar from '../../components/organisms/MenuBar';
import AppBar from '../../components/organisms/AppBar';
import Home from './Home';
import { containerCss, contentCss } from './style';
import MypageV2 from './MypageV2';
import { useLocation } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import useModal from '../../hooks/useModal';
import Calendar from '../Calendar';
import Chat from './Chat';
import useDialog from '../../hooks/useDialog';

interface IMainContext {
  onPendingChange: (state: boolean) => void;
}

export const MainContext = createContext<IMainContext>({} as IMainContext);

const Main = () => {
  const location = useLocation();
  const modal = useModal();
  const { confirm } = useDialog();
  const [curMenu, setCurMenu] = useState<number>(
    location.state?.step ? location.state.step : 1,
  );
  const isPendingRef = useRef<boolean>(false);

  const handleCalendarClick = () => {
    modal.push({ component: <Calendar />, name: 'calendar' });
  };

  const handlePendingChange = useCallback(
    (state: boolean) => {
      isPendingRef.current = state;
    },
    [isPendingRef],
  );

  const handleMenuClick = async (index: number) => {
    if (isPendingRef.current) {
      if (
        !(await confirm(
          '지금 이동하면 채팅 답변을 받을 수 없어요.\n그래도 이동하시겠어요?',
        ))
      ) {
        return;
      }
    }
    isPendingRef.current = false;
    setCurMenu(index);
  };

  return (
    <MainContext.Provider value={{ onPendingChange: handlePendingChange }}>
      <div css={containerCss(curMenu)}>
        <AppBar
          label={
            curMenu === 0 ? '채팅방' : curMenu === 1 ? 'Mine' : '마이페이지'
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
        <MenuBar menu={curMenu} onMenuClick={handleMenuClick} />
      </div>
    </MainContext.Provider>
  );
};

export default Main;
