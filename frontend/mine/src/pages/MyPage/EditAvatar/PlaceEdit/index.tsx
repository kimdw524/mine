/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../../utils/NotificationContext';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { avatarPlaceEditContainerCss, contentCss } from './style';
import { Button, TextField, Typography } from 'oyc-ds';
import { updateAvatarInfo } from '../../../../apis/mypageApi';

const PlaceEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  const notificationContext = useContext(NotificationContext);
  const [newResidence, setNewResidence] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [label, setLabel] = useState<string>('');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewResidence(e.target.value);
    },
    [],
  );

  const placeValidation = useCallback(() => {
    if (newResidence.length === 0) {
      setColor('danger');
      setLabel('거주지를 입력해주세요');
    } else if (newResidence.length > 10) {
      setColor('danger');
      setLabel('10자 이하의 거주지');
    } else if (newResidence === location.state.curResidence) {
      setColor('danger');
      setLabel('동일한 거주지');
    } else {
      setColor('success');
      setLabel('사용 가능한 거주지');
    }
  }, [newResidence]);

  const handleAvatarPlaceChange = async () => {
    await updateAvatarInfo(location.state.avatarId, 'residence', newResidence)
      .then(() => {
        nav('/mypage');
        notificationContext.handle(
          'contained',
          'success',
          '거주지가 성공적으로 변경되었습니다',
        );
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <>
      <div css={avatarPlaceEditContainerCss}>
        <AppBar label="거주지 변경" onBackClick={() => nav('/mypage')} />
        <div css={contentCss}>
          <Typography size="lg" color="dark">
            현재 거주지 : {location.state.curResidence}
          </Typography>
          <TextField
            color={color}
            variant="outlined"
            label={label}
            defaultValue=""
            placeholder="거주지를 입력해주세요"
            onChange={handleInputChange}
            onKeyUp={placeValidation}
          />
          <Button
            fullWidth
            disabled={!(color === 'success')}
            onClick={async () => await handleAvatarPlaceChange()}
          >
            변경하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlaceEdit;
