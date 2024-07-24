/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { nickEditContainerCss, contentCss } from './style';
import { useQuery } from '@tanstack/react-query';
import { Button, TextField, Typography } from 'oyc-ds';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import {
  getUserNickname,
  nicknameDuplicate,
  changeNickname,
} from '../../../../api/myPageApi';
import { useNavigate } from 'react-router-dom';

const NickEdit = () => {
  const nav = useNavigate();
  const [curNick, setCurNick] = useState<string>('');
  const [newNick, setNewNick] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [label, setLabel] = useState<string>('');

  useQuery({
    queryKey: ['nickname'],
    queryFn: async () => {
      const res = await getUserNickname();
      setCurNick(res.data.nickname);
      return res;
    },
  });

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
    } else if (newNick === curNick) {
      setColor('danger');
      setLabel('동일한 닉네임');
    } else {
      await nicknameDuplicate(newNick)
        .then(() => {
          setColor('success');
          setLabel('사용 가능한 닉네임');
        })
        .catch(() => {
          setColor('danger');
          setLabel('중복된 닉네임');
        });
    }
  }, [newNick]);

  const handleNicknameChange = async () => {
    await changeNickname(newNick);
    nav('/mypage');
  };

  return (
    <>
      <div css={nickEditContainerCss}>
        <AppBar
          label="닉네임 변경"
          onBackClick={() => console.log('to main page')}
        />
        <div css={contentCss}>
          <Typography size="lg" color="dark">
            현재 닉네임 : {curNick}
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
      </div>
    </>
  );
};

export default NickEdit;
