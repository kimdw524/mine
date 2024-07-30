/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAvatarInfo } from '../../../../apis/avatarApi';
import { avatarInfoBoxCss, selectBoxCss, selectCss } from './style';
import { MenuTab } from 'oyc-ds';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';

const AvatarInfoFetch = () => {
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
    </>
  );
};

export default AvatarInfoFetch;
