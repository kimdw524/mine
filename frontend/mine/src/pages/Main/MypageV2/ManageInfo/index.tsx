/** @jsxImportSource @emotion/react */
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Dropdown, Icon, Typography } from 'oyc-ds';
import { engToIcon } from '../../../../utils/EngToIcon';
import { engToKor } from '../../../../utils/EngToKor';
import { btnContainerCss, btnCss, containerCss } from './style';
import { useNavigate } from 'react-router-dom';
import { IAvatar } from '../AvatarProfile';
import { getMainAvatar, getNotMainAvatar } from '../../../../utils/avatarUtils';

interface ManageInfoProps {
  title: string;
  labels: string[];
  url: string[];
  data: ReactNode[];
  avatars?: IAvatar[];
}

const ManageInfo = ({ title, labels, url, data, avatars }: ManageInfoProps) => {
  const nav = useNavigate();
  const [avatarNames, setAvatarNames] = useState<string[]>(['pig']);
  const [avatarIdx, setAvatarIdx] = useState<number>(0);

  const handleAvatarChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const curAvatar = (e.target as HTMLSelectElement).value;
    setAvatarIdx(Number(curAvatar));
  };

  useEffect(() => {
    if (avatars) {
      if (avatars.length === 0) return;

      if (avatars.length === 1) {
        setAvatarNames(() => [avatars[0].avatarName]);
      } else {
        setAvatarNames(() => [
          getMainAvatar(avatars as IAvatar[]).avatarName,
          getNotMainAvatar(avatars as IAvatar[]).avatarName,
        ]);
      }
    }
  }, []);

  return (
    <div css={containerCss}>
      {title === '아바타' ? (
        avatars?.length === 0 ? (
          <Typography color="dark">아바타</Typography>
        ) : (
          <>
            {avatars?.length === 1 ? (
              avatars[0].avatarName
            ) : (
              <div style={{ width: 'fit-content' }}>
                <Dropdown
                  size="sm"
                  onChangeCapture={handleAvatarChange}
                  style={{ border: '0', paddingLeft: '0' }}
                >
                  {avatarNames.map((name: string, idx: number) => {
                    return (
                      <Dropdown.Item key={name} value={idx}>
                        {name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown>
              </div>
            )}
          </>
        )
      ) : (
        <Typography color="dark">{title}</Typography>
      )}
      <div css={btnContainerCss}>
        {title === '아바타' ? (
          avatars?.length === 0 ? (
            <Button
              size="lg"
              variant="contained"
              color="light"
              css={btnCss}
              onClick={() => nav('/avatar/create')}
            >
              <Icon>{engToIcon['avatar']}</Icon>
              <Typography color="dark">아바타 생성하기</Typography>
            </Button>
          ) : (
            labels.map((label: string, idx: number) => {
              return (
                <Button
                  key={label}
                  size="lg"
                  variant="contained"
                  color="light"
                  css={btnCss}
                  onClick={() =>
                    nav(url[idx], {
                      state: { data: avatars && avatars[avatarIdx] },
                    })
                  }
                >
                  <Icon>{engToIcon[label]}</Icon>
                  <Typography color="dark">{engToKor[label]}</Typography>
                </Button>
              );
            })
          )
        ) : (
          labels.map((label: string, idx: number) => {
            return (
              <Button
                key={label}
                size="lg"
                variant="contained"
                color="light"
                css={btnCss}
                onClick={() => nav(url[idx], { state: { data: data[idx] } })}
              >
                <Icon>{engToIcon[label]}</Icon>
                <Typography color="dark">{engToKor[label]}</Typography>
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ManageInfo;
