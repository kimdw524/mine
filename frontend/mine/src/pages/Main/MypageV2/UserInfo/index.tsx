/** @jsxImportSource @emotion/react */
import React from 'react';
import { avatarCss, infoContainerCss, infoCss, userInfoCss } from './style';
import { engToIcon } from '../../../../utils/EngToIcon';
import { Icon, Typography } from 'oyc-ds';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface IUserInfo {
  email: string;
  nickname: string;
  gender: string;
}

interface UserInfoProps {
  avatarModel: string;
  info: IUserInfo;
}

interface ModelProps {
  avatarModel: string;
}

const Model = ({ avatarModel }: ModelProps) => {
  const { scene } = useGLTF(`/cute_little_animals/${avatarModel}.glb`);
  return <primitive object={scene} position={[0.1, 0.85, 0]} />;
};

const UserInfo = ({ avatarModel, info }: UserInfoProps) => {
  return (
    <div css={userInfoCss}>
      <div css={avatarCss}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 5], fov: 35 }}
        >
          <ambientLight intensity={3} />
          <Model avatarModel={avatarModel ? avatarModel : 'pig'} />
        </Canvas>
      </div>
      <div css={infoContainerCss}>
        <div css={infoCss}>
          <Icon>{engToIcon['email']}</Icon>
          <Typography size="sm" color="dark">
            {info.email}
          </Typography>
        </div>
        <div css={infoCss}>
          <Icon>{engToIcon['nickname']}</Icon>
          <Typography size="sm" color="dark">
            {info.nickname}
          </Typography>
        </div>
        <div css={infoCss}>
          <Icon>{engToIcon['gender']}</Icon>
          <Typography size="sm" color="dark">
            {info.gender}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
