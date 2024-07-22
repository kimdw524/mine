/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../components/organisms/AppBar';

const CreateAvatar = () => {
  return (
    <>
      <AppBar
        label="설문조사"
        onBackClick={() => console.log('navigate to main')}
      />
    </>
  );
};

export default CreateAvatar;
