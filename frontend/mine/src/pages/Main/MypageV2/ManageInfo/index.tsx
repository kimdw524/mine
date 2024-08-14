/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Icon, Typography } from 'oyc-ds';
import { engToIcon } from '../../../../utils/EngToIcon';
import { engToKor } from '../../../../utils/EngToKor';
import { btnContainerCss, btnCss, containerCss } from './style';
import { useNavigate } from 'react-router-dom';
import useMypage from '../../../../hooks/useMypage';

interface ManageInfoProps {
  title: string;
  labels: string[];
  url: string[];
}

const ManageInfo = ({ title, labels, url }: ManageInfoProps) => {
  const nav = useNavigate();
  const { getAvatar, getMainAvatar, getNotMainAvatar } = useMypage();
  const [targetAvatar, setTargetAvatar] = useState<number>(
    getAvatar().length ? getMainAvatar().avatarId : -1,
  );

  useEffect(() => {
    setTargetAvatar(getAvatar().length ? getMainAvatar().avatarId : -1);
  }, [getMainAvatar()]);

  const handleAvatarChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const curAvatar = (e.target as HTMLSelectElement).value;
    setTargetAvatar(Number(curAvatar));
  };

  return (
    <div css={containerCss}>
      {title === '아바타' ? (
        getAvatar().length === 0 ? (
          <Typography color="dark">아바타</Typography>
        ) : (
          <>
            {getAvatar().length === 1 ? (
              getAvatar()[0].avatarName
            ) : (
              <div style={{ width: 'fit-content' }}>
                <Dropdown
                  size="sm"
                  onChangeCapture={handleAvatarChange}
                  value={targetAvatar}
                  style={{ border: '0', paddingLeft: '0' }}
                >
                  <Dropdown.Item
                    key={getMainAvatar().avatarId}
                    value={getMainAvatar().avatarId}
                  >
                    {getMainAvatar().avatarName}
                  </Dropdown.Item>
                  <Dropdown.Item
                    key={getNotMainAvatar().avatarId}
                    value={getNotMainAvatar().avatarId}
                  >
                    {getNotMainAvatar().avatarName}
                  </Dropdown.Item>
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
          getAvatar().length === 0 ? (
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
                      state: { data: targetAvatar },
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
                onClick={() => nav(url[idx])}
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
