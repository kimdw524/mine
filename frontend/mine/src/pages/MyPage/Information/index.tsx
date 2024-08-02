/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MenuBar from '../../../components/organisms/MenuBar';
import AppBar from '../../../components/organisms/AppBar';
import UserInfo from './UserInfo';
import TransitionAnimation from '../../../components/common/TransitionAnimation';
import styles from './Information.module.css';
import { containerCss } from './style';
import Achievement from './Achievement';
import AvatarInfo from './AvatarInfo';
import { useLocation, useNavigate } from 'react-router-dom';

const Information = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [curMenu, setCurMenu] = useState<number>(
    location.state?.step ? location.state.step : 1,
  );

  return (
    <>
      <div css={containerCss}>
        <AppBar label="마이페이지" onBackClick={() => nav('/')} />
        <TransitionAnimation
          data-key={curMenu.toString()}
          className={{
            normal: styles.fade,
            enter: styles['fade-enter'],
            exit: styles['fade-exit'],
          }}
        >
          <Achievement key={0} />
          <UserInfo key={1} />
          <AvatarInfo key={2} />
        </TransitionAnimation>
        <MenuBar page="mypage" menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </>
  );
};

export default Information;
