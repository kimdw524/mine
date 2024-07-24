/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InfoBox from '../../../components/molecules/InfoBox/InfoBox';
import { userInfoTitle, userInfoBox } from './style';
import { Typography } from 'oyc-ds';

interface UserInfoResponse {
  [key: string]: string;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse>({});
  const { isPending } = useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      await fetch('/mypage/userinfo')
        .then((res) => res.json())
        .then((res) => setUserInfo({ ...res }));
    },
  });

  if (!isPending) {
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
      </>
    );
  } else {
    return <div>hello</div>;
  }
};

export default UserInfo;
