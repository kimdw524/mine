/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { avatarCss, avatarInfoBoxCss, avatarInfoBtn } from './style';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import { IAvatar } from '../AvatarProfile';
import dayjs from 'dayjs';
import { Button } from 'oyc-ds';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '../../../../components/organisms/AppBar';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

interface ModelProps {
  avatarModel: string;
}

const Model = ({ avatarModel }: ModelProps) => {
  const { scene } = useGLTF(`/cute_little_animals/${avatarModel}.glb`);
  return <primitive object={scene} position={[0.1, 0.85, 0]} />;
};

const AvatarInfo = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [avatar, setAvatar] = useState<IAvatar>(location.state.data);

  return (
    <>
      <AppBar
        label="아바타"
        onBackClick={() => nav('/', { state: { step: 2 } })}
      />
      <div css={avatarCss}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 5], fov: 35 }}
        >
          <ambientLight intensity={3} />
          <Model avatarModel={avatar.avatarModel} />
          <OrbitControls />
        </Canvas>
      </div>
      <div css={avatarInfoBoxCss}>
        <InfoBox label={'name'} content={avatar.avatarName} />
        <InfoBox
          label={'birthday'}
          content={dayjs(avatar.birthday).format('YYYY-MM-DD')}
        />
        <InfoBox label={'personality'} content={avatar.personality} />
        <InfoBox label={'job'} content={avatar.job} />
        <InfoBox label={'residence'} content={avatar.residence} />
      </div>
      <div css={avatarInfoBtn}>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatar.avatarId,
                colName: 'avatarName',
                oldInfo: avatar.avatarName,
              },
            })
          }
        >
          이름 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatar.avatarId,
                colName: 'job',
                oldInfo: avatar.job,
              },
            })
          }
        >
          직업 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatar.avatarId,
                colName: 'residence',
                oldInfo: avatar.residence,
              },
            })
          }
        >
          거주지 변경
        </Button>
        {/* <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/qna', {
              state: {
                avatarId: avatar.avatarId,
                name: avatar.avatarName,
                questionType: 'c',
              },
            })
          }
        >
          설문조사
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/qna', {
              state: {
                avatarId: avatar.avatarId,
                name: avatar.avatarName,
                questionType: 's',
              },
            })
          }
        >
          질의응답
        </Button> */}
      </div>
    </>
  );
};

export default AvatarInfo;
