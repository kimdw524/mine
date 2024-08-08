/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
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
import { updateClickEasterAchievement } from '../../../apis/avatarApi';
import AvatarChat from '../../../components/organisms/AvatarChat';

const HomeFetch = () => {
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
      if (res.data) alert('업적이 달성되었습니다!');
    },
  });

  const { mutate: updateClickEaster } = useMutation({
    mutationFn: async () => await updateClickEasterAchievement(),
    onSuccess: (res) => {
      if (res.data) alert('이스터에그 업적이 달성되었습니다!');
    },
  });

  // const { mutate: updateSpinEaster } = useMutation({
  //   mutationFn: async () => await updateSpinEasterAchievement(),
  //   onSuccess: (res) => {
  //     if (res.data) alert('이스터에그 업적이 달성되었습니다!');
  //   },
  // });

  // const { mutate: updateChatEaster } = useMutation({
  //   mutationFn: async () => await updateChatEasterAchievement(),
  //   onSuccess: (res) => {
  //     if (res.data) alert('이스터에그 업적이 달성되었습니다!');
  //   },
  // });

  useEffect(() => updateAttendance(), []);
  
  const [clickCount, setClickCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    console.log(clickCount);

    if (newClickCount === 10) {
      alert(`이스터에그 달성! 캐릭터 그만 때리세요!`);
      updateClickEaster(); 
    }
  }
  const handleMouseDown = () => {
    console.log('Character pressed');
    setEventCount(0);
    setShowMessage(false);
  };

  const handleMouseEnterLeave = () => {
    setEventCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= 20) {
        setShowMessage(true);
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (showMessage) {
      alert('너무 많이 회전해서 어지러워요!');
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
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnterLeave}
          onMouseLeave={handleMouseEnterLeave}
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
            <AvatarChat avatarId={1} />
          ) : (
            <Typography color="dark" size="md">
              너만의 비서를 만들어봐!!
            </Typography>
          )}
          {!avatarQuery.data.data.length && <Button>아바타 생성</Button>}
        </div>
      </div>
    </>
  );
};

export default HomeFetch;
