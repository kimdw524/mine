/** @jsxImportSource @emotion/react */
import React from 'react';
import { avatarCss, infoContainerCss, infoCss, userInfoCss } from './style';
import { engToIcon } from '../../../../utils/EngToIcon';
import { Icon, Typography } from 'oyc-ds';
import { getMainAvatar } from '../../../../utils/avatarUtils';
import useMypage from '../../../../hooks/useMypage';
import Avatar3D from '../../../../components/atoms/Avatar3D';

const UserInfo = () => {
  const { getUser, getAvatar } = useMypage();

  return (
    <div css={userInfoCss}>
      <div css={avatarCss}>
        <Avatar3D
          avatarModel={
            getAvatar().length ? getMainAvatar(getAvatar()).avatarModel : 'pig'
          }
        />
      </div>
      <div css={infoContainerCss}>
        <div css={infoCss}>
          <Icon>{engToIcon['email']}</Icon>
          <Typography size="sm" color="dark">
            {getUser().email}
          </Typography>
        </div>
        <div css={infoCss}>
          <Icon>{engToIcon['nickname']}</Icon>
          <Typography size="sm" color="dark">
            {getUser().nickname}
          </Typography>
        </div>
        <div css={infoCss}>
          <Icon>{engToIcon['gender']}</Icon>
          <Typography size="sm" color="dark">
            {getUser().gender}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
