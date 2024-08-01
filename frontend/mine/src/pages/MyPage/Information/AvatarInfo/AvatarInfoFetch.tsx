/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAvatarInfo } from '../../../../apis/avatarApi';
import {
  avatarInfoBoxCss,
  avatarInfoBtn,
  selectBoxCss,
  selectCss,
} from './style';
import { Button, MenuTab } from 'oyc-ds';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import { useNavigate } from 'react-router-dom';

const AvatarInfoFetch = () => {
  const nav = useNavigate();
  const [avatar, setAvatar] = useState<number>(0);

  const avatarInfoQuery = useSuspenseQuery({
    queryKey: ['avatarinfo'],
    queryFn: async () => await getAvatarInfo(),
  });

  if (avatarInfoQuery.error && !avatarInfoQuery.isFetching) {
    throw avatarInfoQuery.error;
  }

  return (
    <>
      <div css={selectCss}>
        <div css={selectBoxCss}>
          <MenuTab onChangeMenu={(menu: number) => setAvatar(menu)}>
            {avatarInfoQuery.data.data.length > 1
              ? ['1번 아바타', '2번 아바타']
              : ['1번 아바타']}
          </MenuTab>
        </div>
      </div>
      <div css={avatarInfoBoxCss}>
        {Object.keys(avatarInfoQuery.data.data[avatar]).map((v: string) => {
          return (
            <InfoBox
              key={v}
              label={v}
              content={avatarInfoQuery.data.data[avatar][v]}
            />
          );
        })}
      </div>
      <div css={avatarInfoBtn}>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/name', {
              state: { curName: avatarInfoQuery.data.data[avatar]['name'] },
            })
          }
        >
          이름 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/job', {
              state: { curJob: avatarInfoQuery.data.data[avatar]['job'] },
            })
          }
        >
          직업 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/place', {
              state: { curPlace: avatarInfoQuery.data.data[avatar]['place'] },
            })
          }
        >
          거주지 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/choice', {
              state: { name: avatarInfoQuery.data.data[avatar]['name'] },
            })
          }
        >
          설문조사
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/subjective', {
              state: { name: avatarInfoQuery.data.data[avatar]['name'] },
            })
          }
        >
          질의응답
        </Button>
      </div>
    </>
  );
};

export default AvatarInfoFetch;
