/** @jsxImportSource @emotion/react */
import React from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Model = () => {
  const { scene } = useGLTF('/cute_little_animals/rabbit.glb');
  return <primitive object={scene} />;
};

const AvatarTest = () => {
  return (
    <Canvas
      style={{ width: '300px', height: '300px' }}
      camera={{ position: [0, 0, 7], fov: 47 }}
    >
      <color attach="background" args={['white']} />
      <ambientLight intensity={3} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
};

export default AvatarTest;
