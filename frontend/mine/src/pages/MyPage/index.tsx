/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MenuBar from '../../components/organisms/MenuBar';
import AppBar from '../../components/organisms/AppBar';
import { containerCss } from './style';
import UserInfo from './UserInfo';

const MyPage = () => {
  const [curMenu, setCurMenu] = useState<number>(1);

  return (
    <>
      <div css={containerCss}>
        <AppBar
          label="마이페이지"
          onBackClick={() => console.log('to main page')}
        />
        {curMenu === 0 ? (
          <div>it is Menu 0</div>
        ) : curMenu === 1 ? (
          <UserInfo />
        ) : (
          <div>it is Menu 2</div>
        )}
        <MenuBar page="mypage" menu={curMenu} setCurMenu={setCurMenu} />
      </div>
    </>
  );
};

export default MyPage;
