/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MenuBar from '../../../components/organisms/MenuBar';
import AppBar from '../../../components/organisms/AppBar';
import { containerCss } from './style';
import TransitionAnimation from '../../../components/common/TransitionAnimation';
import styles from './Main.module.css';
import Chat from './Chat';
import Voicemail from './Voicemail';
import Home from './Home';

const Main = () => {
  const [curMenu, setCurMenu] = useState<number>(1);
  return (
    <>
        <AppBar
          label="캐릭터 이름"
          onBackClick={() => console.log('to main page')}
        />
      <div css={containerCss}>
        <TransitionAnimation
          data-key={curMenu.toString()}
          className={{
            normal: styles.fade,
            enter: styles['fade-enter'],
            exit: styles['fade-exit'],
          }}
        >
          <Chat key={0}/>
          <Home key={1}/>
          <Voicemail key={2} onSubmit={()=>{setCurMenu(0)}}/>
        </TransitionAnimation>
      </div>
        <MenuBar page="chat" menu={curMenu} setCurMenu={setCurMenu} />
    </>
  );
};

export default Main;
