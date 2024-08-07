/** @jsxImportSource @emotion/react */
import React from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

interface ModelProps {
  avatarModel: string;
}

const Model = ({ avatarModel }: ModelProps) => {
  const { scene } = useGLTF(`/cute_little_animals/${avatarModel}.glb`);
  return <primitive object={scene} position={[0, 0.5, 0]} />;
};

const Avatar3D = ({ avatarModel }: ModelProps) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 5], fov: 47 }}
    >
      <ambientLight intensity={3} />
      <Model avatarModel={avatarModel ? avatarModel : 'pig'} />
      <OrbitControls />
    </Canvas>
  );
};

export default Avatar3D;
