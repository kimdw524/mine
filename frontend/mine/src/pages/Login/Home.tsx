import React from 'react';
import { Button } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [, , removeCookie] = useCookies();
  const nav = useNavigate();

  const handleLogout = () => {
    removeCookie('Token');
    nav('/user/login');
  };

  return (
    <>
      <div>Home 화면입니다.</div>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('/user/signup')}
      >
        회원가입
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('/user/login')}
      >
        로그인
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={handleLogout}
      >
        로그아웃
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('avatar/create')}
      >
        아바타 만들기
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('mypage')}
      >
        됐을까?
      </Button>
    </>
  );
};

export default Home;
