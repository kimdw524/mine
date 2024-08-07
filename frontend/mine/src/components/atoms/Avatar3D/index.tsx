/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export interface ModelProps {
  avatarModel?: string;
  idx?: number;
}

const Avatar3D = ({ avatarModel, idx }: ModelProps) => {
  const [models, setModels] = useState<string[]>([
    'cow',
    'pig',
    'dog',
    'cat',
    'rabbit',
    'unicorn',
  ]);
  const { scene } = useGLTF(
    `/cute_little_animals/${!avatarModel && !idx ? 'cow' : avatarModel ? avatarModel : models[idx ? idx : 0]}.glb`,
  );

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 5], fov: 47 }}
    >
      <ambientLight intensity={3} />
      <primitive object={scene} position={[0, 0.5, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default Avatar3D;
