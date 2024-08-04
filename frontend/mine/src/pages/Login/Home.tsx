import React from 'react';
import { Button } from 'oyc-ds';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUser } from './UserContext';

const Home = () => {
  const [, , removeCookie] = useCookies(['Token']);
  const nav = useNavigate();
  const { userInfo, setUserInfo } = useUser();

  const handleLogout = () => {
    removeCookie('Token');
    setUserInfo({});
    localStorage.removeItem('userInfo');
    // nav('/user/login');
  };

  console.log(userInfo.nickname);

  return (
    <>
      <div>Home 화면입니다.</div>
      {userInfo.nickname && <div>{userInfo.nickname}님 환영합니다!</div>}
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
