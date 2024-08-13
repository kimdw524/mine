/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { getUserAvatars, getUserInfo } from '../../../apis/mypageApi';
import { Button, Typography } from 'oyc-ds';
import { avatarContainerCss, conversationCss, numberdayCss } from './style';
import { containerCss } from './style';
import Avatar3D from '../../../components/atoms/Avatar3D';
import useDialog from '../../../hooks/useDialog';
import { updateAttendenceAchievement } from '../../../apis/authApi';
import {
  updateClickEasterAchievement,
  updateSpinEasterAchievement,
} from '../../../apis/avatarApi';
import AvatarChat from '../../../components/organisms/AvatarChat';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getMainAvatar } from '../../../utils/avatarUtils';

const HomeFetch = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
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
    return false;
  });

  const { alert } = useDialog();
  const { mutate: updateAttendance } = useMutation({
    mutationFn: async () => await updateAttendenceAchievement(),
    onSuccess: (res) => {
      if (res.data) alert('업적 달성!!');
    },
  });

  const [clickCount, setClickCount] = useState(0);

  const { mutate: updateClickEaster } = useMutation({
    mutationFn: async () => await updateClickEasterAchievement(),
    onSuccess: (res) => {
      // 최초 달성시에만 res.data가 true가 됨
      if (res.data) {
        queryClient.invalidateQueries({ queryKey: ['clickeaster'] });
        alert(
          <div>
            이스터에그 달성!
            <br />
            그렇게 때리면 아파요 🤕
          </div>,
        );
      }
    },
  });

  const { mutate: updateSpinEaster } = useMutation({
    mutationFn: async () => await updateSpinEasterAchievement(),
    onSuccess: (res) => {
      if (res.data) {
        queryClient.invalidateQueries({ queryKey: ['spineaster'] });
        alert(
          <div>
            이스터에그 달성!
            <br />
            너무 회전해서 어지러워요 😵‍💫
          </div>,
        );
      }
    },
  });

  useEffect(() => updateAttendance(), []);

  // 클릭 이스터에그
  const eventCountRef = useRef(0);
  const [showMessage, setShowMessage] = useState(false);
  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (avatarQuery.data.data.length && newClickCount === 10) {
      setClickCount(0);
      updateClickEaster();
    }
  };

  // 회전 이스터 에그
  const handleTouchStart = () => {
    eventCountRef.current = 0;
    setShowMessage(false);
  };

  const handleTouchMove = () => {
    eventCountRef.current += 1;

    if (eventCountRef.current === 400 && !showMessage) {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    if (avatarQuery.data.data.length && showMessage) {
      updateSpinEaster();
    }
  }, [showMessage, alert, updateSpinEaster]);

  return (
    <>
      <div css={containerCss}>
        <Typography color="dark" css={numberdayCss}>
          반가워{' '}
          <Typography color="dark" size="xl" style={{ display: 'inline' }}>
            {userQuery.data.data.nickname}
          </Typography>
          <br />
          {avatarQuery.data.data.length && (
            <>
              난 너의 비서{' '}
              <Typography color="dark" size="xl" style={{ display: 'inline' }}>
                {getMainAvatar(avatarQuery.data.data).avatarName}
              </Typography>{' '}
              이야
            </>
          )}
        </Typography>
        <div
          css={avatarContainerCss}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchMove}
          onClick={handleClick}
        >
          <Avatar3D
            avatarModel={
              avatarQuery.data.data.length
                ? getMainAvatar(avatarQuery.data.data).avatarModel
                : 'pig'
            }
          />
        </div>
        <div css={conversationCss}>
          {avatarQuery.data.data.length ? (
            <AvatarChat
              avatarId={getMainAvatar(avatarQuery.data.data).avatarId}
              voiceId={getMainAvatar(avatarQuery.data.data).voiceId}
            />
          ) : (
            <Typography color="dark" size="md">
              너만의 비서를 만들어봐!!
            </Typography>
          )}
          {!avatarQuery.data.data.length && (
            <Button onClick={() => nav('/avatar/create')}>아바타 생성</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeFetch;
