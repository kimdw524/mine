import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

interface UserInfo {
  nickname?: string;
  email?: string;
}

const defaultUserInfo: UserInfo = {};

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<UserContextType>({
  userInfo: defaultUserInfo,
  setUserInfo: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [cookies, , ] = useCookies(['Token']);
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : defaultUserInfo;
  });

  useEffect(() => {
    if (!cookies.Token) {
      setUserInfo({});
      localStorage.removeItem('userInfo');
    }
  }, [cookies]);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
