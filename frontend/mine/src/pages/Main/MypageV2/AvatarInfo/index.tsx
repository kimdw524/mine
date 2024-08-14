/** @jsxImportSource @emotion/react */
import React from 'react';
import { avatarCss, avatarInfoBoxCss, avatarInfoBtn } from './style';
import InfoBox from '../../../../components/molecules/InfoBox/InfoBox';
import dayjs from 'dayjs';
import { Button } from 'oyc-ds';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '../../../../components/organisms/AppBar';
import Avatar3D from '../../../../components/atoms/Avatar3D';
import useMypage from '../../../../hooks/useMypage';

const AvatarInfo = () => {
  const nav = useNavigate();
  const { getAvatarById } = useMypage();
  const location = useLocation();

  return (
    <>
      <AppBar
        label="아바타"
        onBackClick={() => nav('/', { state: { step: 2 } })}
      />
      <div css={avatarCss}>
        <Avatar3D
          avatarModel={getAvatarById(location.state.data).avatarModel}
        />
      </div>
      <div css={avatarInfoBoxCss}>
        <InfoBox
          label={'name'}
          content={getAvatarById(location.state.data).avatarName}
        />
        <InfoBox
          label={'birthday'}
          content={dayjs(getAvatarById(location.state.data).birthday).format(
            'YYYY-MM-DD',
          )}
        />
        {getAvatarById(location.state.data).personality && (
          <InfoBox
            label={'personality'}
            content={getAvatarById(location.state.data).personality}
          />
        )}
        <InfoBox
          label={'job'}
          content={getAvatarById(location.state.data).job}
        />
        <InfoBox
          label={'residence'}
          content={getAvatarById(location.state.data).residence}
        />
      </div>
      <div css={avatarInfoBtn}>
        <Button
          fullWidth
          onClick={() =>
            nav('/mypage/avatar/info', {
              state: {
                avatarId: getAvatarById(location.state.data).avatarId,
                colName: 'avatarName',
                oldInfo: getAvatarById(location.state.data).avatarName,
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
                avatarId: getAvatarById(location.state.data).avatarId,
                colName: 'job',
                oldInfo: getAvatarById(location.state.data).job,
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
                avatarId: getAvatarById(location.state.data).avatarId,
                colName: 'residence',
                oldInfo: getAvatarById(location.state.data).residence,
              },
            })
          }
        >
          거주지 변경
        </Button>
      </div>
    </>
  );
};

export default AvatarInfo;
