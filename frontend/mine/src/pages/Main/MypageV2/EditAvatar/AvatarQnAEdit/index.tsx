/** @jsxImportSource @emotion/react */
import React from 'react';
import AppBar from '../../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { avatarQnAEditContainerCss, questionCss, titleCss } from './style';
import { Typography } from 'oyc-ds';
import AvatarQnAEditFetch from './AvatarQnAEditFetch';
import useMypage from '../../../../../hooks/useMypage';

const AvatarQnAEdit = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { getAvatarById } = useMypage();

  return (
    <>
      <div css={avatarQnAEditContainerCss}>
        <AppBar
          label={getAvatarById(location.state.data).avatarName}
          onBackClick={() => nav('/', { state: { step: 2 } })}
        />
        <div css={titleCss}>
          <Typography size="md" color="dark">
            QnA
          </Typography>
        </div>
        <div css={questionCss}>
          <AvatarQnAEditFetch
            avatarId={getAvatarById(location.state.data).avatarId}
          />
        </div>
      </div>
    </>
  );
};

export default AvatarQnAEdit;
