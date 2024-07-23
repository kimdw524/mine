/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { nickEditContainerCss } from './style';
import { useQuery } from '@tanstack/react-query';

const NickEdit = () => {
  const [nickname, setNickname] = useState<string>('hello');

  useQuery({
    queryKey: ['nickname'],
    queryFn: async () => {
      await fetch('/mypage/nickname')
        .then((res) => res.json())
        .then((res) => setNickname(res.nickname));
    },
  });

  return (
    <>
      <div css={nickEditContainerCss}>
        <AppBar
          label="닉네임 변경"
          onBackClick={() => console.log('to main page')}
        />
      </div>
    </>
  );
};

export default NickEdit;
