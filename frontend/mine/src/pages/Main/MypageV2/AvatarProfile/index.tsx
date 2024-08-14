/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, profileCss } from './style';
import { Button, Typography } from 'oyc-ds';
import { useMutation } from '@tanstack/react-query';
import { updateAvatarInfo } from '../../../../apis/mypageApi';
import useDialog from '../../../../hooks/useDialog';
import useMypage, { IAvatar } from '../../../../hooks/useMypage';

interface UpdateData {
  avatarId: number;
  infoType: string;
}

const AvatarProfile = () => {
  const { getAvatar, updateInfo } = useMypage();
  const { alert } = useDialog();

  const { mutate } = useMutation({
    mutationFn: (data: UpdateData) =>
      updateAvatarInfo(data.avatarId, data.infoType, true),
    onSuccess: (data) => {
      if (data.status === 202) {
        updateInfo('avatar');
        //window.location.reload();
      }
    },
    onError: () => {
      alert('오류가 발생하였습니다.');
    },
  });

  return (
    <div css={containerCss}>
      {getAvatar().length ? (
        <>
          {getAvatar().map((avatar: IAvatar) => {
            return (
              <div key={avatar.avatarName} css={profileCss}>
                <Typography
                  size="md"
                  color={avatar.isMain ? 'primary' : 'dark'}
                >
                  {avatar.avatarName}
                </Typography>
                <Button
                  size="sm"
                  color={avatar.isMain ? 'secondary' : 'primary'}
                  disabled={avatar.isMain}
                  onClick={() =>
                    mutate({
                      avatarId: avatar.avatarId,
                      infoType: 'isMain',
                    })
                  }
                >
                  <Typography
                    size="xs"
                    color={avatar.isMain ? 'dark' : 'light'}
                  >
                    {avatar.isMain ? '현재 아바타' : '메인 아바타 지정'}
                  </Typography>
                </Button>
              </div>
            );
          })}
        </>
      ) : (
        <div>아바타 없음</div>
      )}
    </div>
  );
};

export default AvatarProfile;
