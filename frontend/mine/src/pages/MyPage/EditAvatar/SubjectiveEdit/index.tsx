/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation } from 'react-router-dom';

const SubjectiveEdit = () => {
  const location = useLocation();
  return (
    <>
      <AppBar label={location.state.name} />
    </>
  );
};

export default SubjectiveEdit;
