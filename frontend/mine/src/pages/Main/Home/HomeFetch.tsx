/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { getUserAvatars, getUserInfo } from '../../../apis/mypageApi';
import { Button, Toggle, Typography } from 'oyc-ds';
import {
  avatarContainerCss,
  conversationCss,
  numberdayCss,
  toggleContainerCss,
} from './style';
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

const HomeFetch = () => {
  const nav = useNavigate();
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
      if (res.data) alert('이스터 에그 업적 달성!');
    },
  });

  const { mutate: updateSpinEaster } = useMutation({
    mutationFn: async () => await updateSpinEasterAchievement(),
    onSuccess: (res) => {
      if (res.data) alert('이스터 에그 업적 달성!');
    },
  });

  useEffect(() => updateAttendance(), []);

  // 클릭 이스터에그
  const eventCountRef = useRef(0);
  const [showMessage, setShowMessage] = useState(false);
  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount === 10) {
      alert(`그렇게 누르면 아파요!!`);
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

    if (eventCountRef.current === 300 && !showMessage) {
      setShowMessage(true);
    }
  };
  useEffect(() => {
    if (showMessage) {
      alert('너무 많이 회전해서 어지러워요!');
      updateSpinEaster();
    }
  }, [showMessage]);

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
                ? avatarQuery.data.data[0].isMain
                  ? avatarQuery.data.data[0].avatarModel
                  : avatarQuery.data.data[1].avatarModel
                : 'pig'
            }
          />
        </div>
        <div css={conversationCss}>
          {avatarQuery.data.data.length ? (
            <AvatarChat
              avatarId={1}
              voiceId={avatarQuery.data.data[0].voiceId}
              voice={!isOn}
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
