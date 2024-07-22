/** @jsxImportSource @emotion/react */
import React from 'react';
import MenuBar from '../../components/organisms/MenuBar';
import AppBar from '../../components/organisms/AppBar';

const MyPage = () => {
  return (
    <>
      <AppBar
        label="마이페이지"
        onBackClick={() => console.log('to main page')}
      />
      <MenuBar />
    </>
  );
};

export default MyPage;
