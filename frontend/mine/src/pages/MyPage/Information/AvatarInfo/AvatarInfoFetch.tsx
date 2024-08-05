/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  avatarInfoBoxCss,
  avatarInfoBtn,
  selectBoxCss,
  selectCss,
} from './style';
import { Button, MenuTab } from 'oyc-ds';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import { useNavigate } from 'react-router-dom';
import { getUserAvatars } from '../../../../apis/mypageApi';
import dayjs from 'dayjs';

interface IAvatarInfo {
  avatarId: number;
  avatarName: string;
  birthday: string;
  modelId: number;
  job: string;
  residence: string;
}

const AvatarInfoFetch = () => {
  const nav = useNavigate();
  const [avatar, setAvatar] = useState<number>(0);

  const avatarInfoQuery = useSuspenseQuery({
    queryKey: ['avatarinfo'],
    queryFn: async () => await getUserAvatars(),
  });

  if (avatarInfoQuery.error && !avatarInfoQuery.isFetching) {
    throw avatarInfoQuery.error;
  }

  return (
    <>
      <div css={selectCss}>
        <div css={selectBoxCss}>
          <MenuTab onChangeMenu={(menu: number) => setAvatar(menu)}>
            {avatarInfoQuery.data.data.map(
              (avatar: IAvatarInfo) => avatar.avatarName,
            )}
          </MenuTab>
        </div>
      </div>
      <div css={avatarInfoBoxCss}>
        <InfoBox
          label={'name'}
          content={avatarInfoQuery.data.data[avatar].avatarName}
        />
        <InfoBox
          label={'birthday'}
          content={dayjs(avatarInfoQuery.data.data[avatar].birthday).format(
            'YYYY-MM-DD',
          )}
        />
        <InfoBox
          label={'personality'}
          content={avatarInfoQuery.data.data[avatar].personality}
        />
        <InfoBox
          label={'job'}
          content={avatarInfoQuery.data.data[avatar].job}
        />
        <InfoBox
          label={'residence'}
          content={avatarInfoQuery.data.data[avatar].residence}
        />
      </div>
      <div css={avatarInfoBtn}>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatarInfoQuery.data.data[avatar].avatarId,
                colName: 'avatarName',
                oldInfo: avatarInfoQuery.data.data[avatar].avatarName,
              },
            })
          }
        >
          이름 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatarInfoQuery.data.data[avatar].avatarId,
                colName: 'job',
                oldInfo: avatarInfoQuery.data.data[avatar].job,
              },
            })
          }
        >
          직업 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: avatarInfoQuery.data.data[avatar].avatarId,
                colName: 'residence',
                oldInfo: avatarInfoQuery.data.data[avatar].residence,
              },
            })
          }
        >
          거주지 변경
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/qna', {
              state: {
                avatarId: avatarInfoQuery.data.data[avatar].avatarId,
                name: avatarInfoQuery.data.data[avatar].avatarName,
                questionType: 'c',
              },
            })
          }
        >
          설문조사
        </Button>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/qna', {
              state: {
                avatarId: avatarInfoQuery.data.data[avatar].avatarId,
                name: avatarInfoQuery.data.data[avatar].avatarName,
                questionType: 's',
              },
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
