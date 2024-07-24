/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import { userInfoTitle, userInfoBox, userInfoBtn } from './style';
import { Button, Typography } from 'oyc-ds';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../../../api/myPageApi';

interface UserInfoResponse {
  [key: string]: string;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse>({});

  useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      const res = await getUserInfo();
      setUserInfo({ ...res.data });
      return res;
    },
  });

  return (
    <>
      <div css={userInfoTitle}>
        <Typography weight="bold" color="dark" size="xl">
          회원정보
        </Typography>
      </div>
      <div css={userInfoBox}>
        {Object.keys(userInfo).map((v: string) => {
          return <InfoBox key={v} label={v} content={userInfo[v]} />;
        })}
      </div>
      <div css={userInfoBtn}>
        <Link to="/mypage/nickname">
          <Button fullWidth>닉네임 변경</Button>
        </Link>
        <Button fullWidth>비밀번호 변경</Button>
      </div>
    </>
  );
};

export default UserInfo;
