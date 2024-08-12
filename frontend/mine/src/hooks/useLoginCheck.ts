import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 로그인 상태면 메인 페이지로 이동
export const useLoginCheck = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const nav = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      nav('/');
    }
  }, [isLoggedIn, nav]);
};
