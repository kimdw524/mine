/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from 'react';
import { Button, TextField, Typography } from 'oyc-ds';
import { contentCss } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { updateNickname } from '../../../../apis/mypageApi';
import { NotificationContext } from '../../../../utils/NotificationContext';

const NickEditFetch = () => {
  const nav = useNavigate();
  const location = useLocation();
  const notificationContext = useContext(NotificationContext);
  const [newNick, setNewNick] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [label, setLabel] = useState<string>('');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewNick(e.target.value);
    },
    [],
  );

  const nickValidation = useCallback(async () => {
    if (newNick.length === 0) {
      setColor('danger');
      setLabel('닉네임을 입력해주세요');
    } else if (newNick.length > 10) {
      setColor('danger');
      setLabel('10자 이하의 닉네임');
    } else if (newNick === location.state.curNick) {
      setColor('danger');
      setLabel('동일한 닉네임');
    } else {
      setColor('success');
      setLabel('사용 가능한 닉네임');
    }
  }, [newNick]);

  const handleNicknameChange = async () => {
    await updateNickname(newNick)
      .then(() => {
        notificationContext.handle(
          'contained',
          'success',
          '닉네임이 성공적으로 변경되었습니다',
        );
        nav('/mypage');
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <div css={contentCss}>
      <Typography size="lg" color="dark">
        현재 닉네임 : {location.state.curNick}
      </Typography>
      <TextField
        color={color}
        variant="outlined"
        label={label}
        defaultValue=""
        placeholder="닉네임을 입력해주세요"
        onChange={handleInputChange}
        onKeyUp={nickValidation}
      />
      <Button
        fullWidth
        disabled={!(color === 'success')}
        onClick={async () => await handleNicknameChange()}
      >
        변경하기
      </Button>
    </div>
  );
};

export default NickEditFetch;
