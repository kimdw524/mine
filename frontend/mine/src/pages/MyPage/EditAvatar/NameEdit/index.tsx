/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../../utils/NotificationContext';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { avatarNameEditContainerCss, contentCss } from './style';
import { Button, TextField, Typography } from 'oyc-ds';
import { updateAvatarInfo } from '../../../../apis/mypageApi';

const NameEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  const notificationContext = useContext(NotificationContext);
  const [newName, setNewName] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [label, setLabel] = useState<string>('');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(e.target.value);
    },
    [],
  );

  const nameValidation = useCallback(() => {
    if (newName.length === 0) {
      setColor('danger');
      setLabel('이름을 입력해주세요');
    } else if (newName.length > 10) {
      setColor('danger');
      setLabel('10자 이하의 이름');
    } else if (newName === location.state.curName) {
      setColor('danger');
      setLabel('동일한 이름');
    } else {
      setColor('success');
      setLabel('사용 가능한 이름');
    }
  }, [newName]);

  const handleAvatarNameChange = async () => {
    await updateAvatarInfo(location.state.avatarId, 'avatarName', newName)
      .then(() => {
        nav('/mypage');
        notificationContext.handle(
          'contained',
          'success',
          '이름이 성공적으로 변경되었습니다',
        );
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <>
      <div css={avatarNameEditContainerCss}>
        <AppBar label="이름 변경" onBackClick={() => nav('/mypage')} />
        <div css={contentCss}>
          <Typography size="lg" color="dark">
            현재 이름 : {location.state.curName}
          </Typography>
          <TextField
            color={color}
            variant="outlined"
            label={label}
            defaultValue=""
            placeholder="이름을 입력해주세요"
            onChange={handleInputChange}
            onKeyUp={nameValidation}
          />
          <Button
            fullWidth
            disabled={!(color === 'success')}
            onClick={async () => await handleAvatarNameChange()}
          >
            변경하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default NameEdit;
