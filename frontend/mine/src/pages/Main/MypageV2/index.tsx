/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { btnCss, containerCss, infoManageCss } from './style';
import { QueryClient, useQueries } from '@tanstack/react-query';
import { getUserAvatars, getUserInfo } from '../../../apis/mypageApi';
import UserInfo from './UserInfo';
import ManageInfo from './ManageInfo';
import AvatarProfile from './AvatarProfile';
import { Button, Icon, Typography } from 'oyc-ds';
import { engToIcon } from '../../../utils/EngToIcon';
import { Logout } from '../../../apis/loginApi';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/molecules/Loading';

const MypageV2 = () => {
  const nav = useNavigate();
  const [userQuery, avatarQuery] = useQueries({
    queries: [
      { queryKey: ['userinfo'], queryFn: () => getUserInfo() },
      { queryKey: ['avatarinfo'], queryFn: () => getUserAvatars() },
    ],
  });

  const [curAvatar, setCurAvatar] = useState<string>('pig');

  useEffect(() => {
    if (avatarQuery.data?.data.length === 1) {
      setCurAvatar(avatarQuery.data.data[0].avatarModel);
    } else if (avatarQuery.data?.data.length === 2) {
      setCurAvatar(
        avatarQuery.data.data[0].isMain
          ? avatarQuery.data.data[0].avatarModel
          : avatarQuery.data.data[1].avatarModel,
      );
    }
  }, []);

  for (const query of [userQuery, avatarQuery]) {
    if (query.status !== 'success' || !query.isFetchedAfterMount) {
      return <Loading />;
    }
  }
  const handleLogout = async () => {
    const res = await Logout();
    if (res.status === 200) {
      const queryClient = new QueryClient();
      queryClient.clear();
      localStorage.removeItem('isLoggedIn');
      nav('/user/login');
    }
  };

  return (
    <>
      <div css={containerCss}>
        <UserInfo avatarModel={curAvatar} info={userQuery.data?.data} />
        <AvatarProfile avatars={avatarQuery.data?.data} />
        <ManageInfo
          title={'내정보'}
          labels={['nickEdit', 'pwdEdit', 'achievement']}
          url={['/mypage/nick', '/mypage/pwd', '/mypage/achievement']}
          data={[userQuery.data?.data.nickname]}
        />
        <ManageInfo
          title={'아바타'}
          labels={['infoEdit', 'qnaEdit']}
          url={['/mypage/avatar', '/mypage/avatar/qna']}
          data={[]}
          avatars={avatarQuery.data?.data}
        />
        <ManageInfo
          title={'통계'}
          labels={['accountChart', 'scheduleChart']}
          url={['/chart/account', '/chart/schedule']}
          data={[]}
        />
        <div css={infoManageCss}>
          <Typography color="dark">정보관리</Typography>
          <Button
            size="lg"
            variant="contained"
            color="light"
            css={btnCss}
            fullWidth
            onClick={() => handleLogout()}
          >
            <Icon>{engToIcon['avatar']}</Icon>
            <Typography color="dark">로그아웃</Typography>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MypageV2;
