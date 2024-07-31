/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation } from 'react-router-dom';

const ChoiceEdit = () => {
  const location = useLocation();
  return (
    <>
      <AppBar label={location.state.name} />v
    </>
  );
};

export default ChoiceEdit;
