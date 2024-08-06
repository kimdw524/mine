/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getUserAvatars, getUserInfo } from '../../../apis/mypageApi';
import { Button, Toggle, Typography } from 'oyc-ds';
import {
  avatarContainerCss,
  conversationCss,
  numberdayCss,
  toggleContainerCss,
} from './style';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { containerCss } from './style';

interface ModelProps {
  avatarModel: string;
}

const Model = ({ avatarModel }: ModelProps) => {
  const { scene } = useGLTF(`/cute_little_animals/${avatarModel}.glb`);
  return <primitive object={scene} position={[0, 0.5, 0]} />;
};

const HomeFetch = () => {
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

  const [isOn, setIsOn] = useState<boolean>(true);

  return (
    <>
      <div css={containerCss}>
        <Typography color="dark" css={numberdayCss}>
          반가워{' '}
          <Typography color="dark" size="xl" style={{ display: 'inline' }}>
            {userQuery.data.data.nickname}
          </Typography>
          <br />
          {avatarQuery.data.data.length === 0 ? (
            ''
          ) : (
            <>
              난 너의 비서{' '}
              <Typography color="dark" size="xl" style={{ display: 'inline' }}>
                {avatarQuery.data.data[0].avatarName}
              </Typography>{' '}
              이야
            </>
          )}
        </Typography>
        <div css={toggleContainerCss}>
          <Typography color="dark" size="md" weight="medium">
            {isOn ? '음성 켜기' : '음성 끄기'}
          </Typography>
          <Toggle
            color="primary"
            size="md"
            onClick={() => (isOn ? setIsOn(false) : setIsOn(true))}
          />
        </div>
        <div css={avatarContainerCss}>
          <Canvas
            style={{ width: '100%', height: '100%' }}
            camera={{ position: [0, 0, 5], fov: 47 }}
          >
            <ambientLight intensity={3} />
            <Model avatarModel={avatarQuery.data.data.length ? 'cow' : 'pig'} />
            <OrbitControls />
          </Canvas>
        </div>
        <div css={conversationCss}>
          <Typography color="dark" size="md">
            {avatarQuery.data.data.length === 0
              ? '너만의 비서를 만들어봐!!'
              : '오늘도 보러 와줘서 고마워!!'}
          </Typography>
          {!avatarQuery.data.data.length && <Button>아바타 생성</Button>}
        </div>
      </div>
    </>
  );
};

export default HomeFetch;
