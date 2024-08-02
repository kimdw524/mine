/** @jsxImportSource @emotion/react */
import React from 'react';
import { userInfoBox, userInfoBtn } from './style';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../../apis/mypageApi';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'oyc-ds';

const UserInfoFetch = () => {
  const userInfoQuery = useSuspenseQuery({
    queryKey: ['userinfo'],
    queryFn: async () => await getUserInfo(),
  });

  if (userInfoQuery.error && !userInfoQuery.isFetching) {
    throw userInfoQuery.error;
  }

  const nav = useNavigate();

  const handleNickname = () => {
    nav('/mypage/nickname', {
      state: { curNick: userInfoQuery.data.data.nickname },
    });
  };

  return (
    <>
      <div css={userInfoBox}>
        <InfoBox label={'email'} content={userInfoQuery.data.data.email} />
        <InfoBox
          label={'nickname'}
          content={userInfoQuery.data.data.nickname}
        />
        <InfoBox
          label={'gender'}
          content={
            userInfoQuery.data.data.gender
              ? userInfoQuery.data.data.gender
              : '남성'
          }
        />
      </div>
      <div css={userInfoBtn}>
        <Button fullWidth onClick={handleNickname}>
          닉네임 변경
        </Button>
        <Link to="/mypage/password">
          <Button fullWidth>비밀번호 변경</Button>
        </Link>
      </div>
    </>
  );
};

export default UserInfoFetch;
