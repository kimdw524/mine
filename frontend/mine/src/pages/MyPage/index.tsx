/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MenuBar from '../../components/organisms/MenuBar';
import AppBar from '../../components/organisms/AppBar';
import { containerCss } from './style';
import UserInfo from './UserInfo';
import TransitionAnimation from '../../components/common/TransitionAnimation';
import styles from './MyPage.module.css';

const MyPage = () => {
  const [curMenu, setCurMenu] = useState<number>(1);

  return (
    <>
      <div css={containerCss}>
        <AppBar
          label="마이페이지"
          onBackClick={() => console.log('to main page')}
        />
        <TransitionAnimation
          data-key={curMenu.toString()}
          className={{
            normal: styles.fade,
            enter: styles['fade-enter'],
            exit: styles['fade-exit'],
          }}
        >
          <div key={0}>it is Menu 0</div>
          <UserInfo key={1} />
          <div key={2}>it is Menu 2</div>
        </TransitionAnimation>

        <MenuBar page="mypage" menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </>
  );
};

export default MyPage;
