import React from 'react';
import { Button } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../apis/loginApi';

const Home = () => {
  const nav = useNavigate();

  const logoutHandler = async () => {
    try {
      const responseData = await Logout();
      if (responseData) {
        document.cookie = "MM=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=honeyitem.shop;";
        nav('/user/login');
      }
    } catch (error) {
      console.error(error);
    }
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
        onClick={logoutHandler}
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
        마이페이지
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('schedule')}
      >
        일정
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('account')}
      >
        가계부
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('chat')}
      >
        채팅
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('accountchart')}
      >
        가계부 통계
      </Button>
      <Button
        color="primary"
        size="xl"
        variant="contained"
        onClick={() => nav('schedulechart')}
      >
        일정 통계
      </Button>
    </>
  );
};

export default Home;
