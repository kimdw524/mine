/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { btnCss, containerCss, infoManageCss } from './style';
import { QueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { getUserAvatars, getUserInfo } from '../../../apis/mypageApi';
import UserInfo from './UserInfo';
import ManageInfo from './ManageInfo';
import AvatarProfile from './AvatarProfile';
import { Button, Icon, Typography } from 'oyc-ds';
import { engToIcon } from '../../../utils/EngToIcon';
import { Logout } from '../../../apis/loginApi';
import { useNavigate } from 'react-router-dom';

const MypageV2 = () => {
  const [userQuery, avatarQuery] = useSuspenseQueries({
    queries: [
      { queryKey: ['userinfo'], queryFn: async () => await getUserInfo() },
      { queryKey: ['avatarinfo'], queryFn: async () => await getUserAvatars() },
    ],
  });

  [userQuery, avatarQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const [curAvatar, setCurAvatar] = useState<string>('pig');

  useEffect(() => {
    if (avatarQuery.data.data.length === 1) {
      setCurAvatar(avatarQuery.data.data[0].avatarModel);
    } else if (avatarQuery.data.data.length === 2) {
      setCurAvatar(
        avatarQuery.data.data[0].isMain
          ? avatarQuery.data.data[0].avatarModel
          : avatarQuery.data.data[1].avatarModel,
      );
    }
  }, []);

  const nav = useNavigate();
  const handleLogout = async () => {
    const res = await Logout();
    if (res.status === 200) {
      const queryClient = new QueryClient();
      queryClient.clear();
      nav('/user/login');
    }
  };

  return (
    <>
      <div css={containerCss}>
        <UserInfo avatarModel={curAvatar} info={userQuery.data.data} />
        <AvatarProfile avatars={avatarQuery.data.data} />
        <ManageInfo
          title={'내정보'}
          labels={['nickEdit', 'pwdEdit', 'achievement']}
          url={['/mypage/nick', '/mypage/pwd', '/mypage/achievement']}
          data={[userQuery.data.data.nickname]}
        />
        <ManageInfo
          title={'아바타'}
          labels={['infoEdit', 'qnaEdit']}
          url={['/mypage/avatar', '/mypage/avatar/qna']}
          data={[]}
          avatars={avatarQuery.data.data}
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
