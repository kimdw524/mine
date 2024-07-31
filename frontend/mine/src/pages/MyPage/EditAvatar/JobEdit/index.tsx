/** @jsxImportSource @emotion/react */
import React, { useCallback, useContext, useState } from 'react';
import AppBar from '../../../../components/organisms/AppBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../../utils/NotificationContext';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { avatarJobEditContainerCss, contentCss } from './style';
import { changeAvatarJob } from '../../../../apis/avatarApi';
import { Button, TextField, Typography } from 'oyc-ds';

const JobEdit = () => {
  const nav = useNavigate();
  const location = useLocation();
  const notificationContext = useContext(NotificationContext);
  const [newJob, setNewJob] = useState<string>('');
  const [color, setColor] = useState<Palette>('primary');
  const [label, setLabel] = useState<string>('');

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewJob(e.target.value);
    },
    [],
  );

  const jobValidation = useCallback(() => {
    if (newJob.length === 0) {
      setColor('danger');
      setLabel('직업을 입력해주세요');
    } else if (newJob.length > 10) {
      setColor('danger');
      setLabel('10자 이하의 직업');
    } else if (newJob === location.state.curJob) {
      setColor('danger');
      setLabel('동일한 직업');
    } else {
      setColor('success');
      setLabel('사용 가능한 직업');
    }
  }, [newJob]);

  const handleAvatarJobChange = async () => {
    await changeAvatarJob(1, newJob)
      .then(() => {
        nav('/mypage');
        notificationContext.handle(
          'contained',
          'success',
          '직업이 성공적으로 변경되었습니다',
        );
      })
      .catch(() => {
        notificationContext.handle('contained', 'danger', '다시 시도해주세요');
      });
  };

  return (
    <>
      <div css={avatarJobEditContainerCss}>
        <AppBar label="직업 변경" onBackClick={() => nav('/mypage')} />
        <div css={contentCss}>
          <Typography size="lg" color="dark">
            현재 직업 : {location.state.curJob}
          </Typography>
          <TextField
            color={color}
            variant="outlined"
            label={label}
            defaultValue=""
            placeholder="직업을 입력해주세요"
            onChange={handleInputChange}
            onKeyUp={jobValidation}
          />
          <Button
            fullWidth
            disabled={!(color === 'success')}
            onClick={async () => await handleAvatarJobChange()}
          >
            변경하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobEdit;
