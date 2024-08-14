/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import RecordButton from '../../../components/molecules/RecordButton';
import useUserAudio from '../../../hooks/useUserAudio';
import { Typography } from 'oyc-ds';
import { css } from '@emotion/react';
import useDialog from '../../../hooks/useDialog';

interface RecordProps {
  onRecord: (result: string) => void;
}

const containerCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const Record = ({ onRecord }: RecordProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [tip, setTip] = useState<string>('');
  const userAudio = useUserAudio();
  const { alert } = useDialog();

  const handleClick = () => {
    if (active) {
      userAudio
        .stop()
        .then((result) => {
          onRecord(result as string);
        })
        .catch(() => {
          alert('오류가 발생하여 녹음을 하지 못했습니다.');
        });
      setActive(false);
      setTip('버튼을 한 번 더 누르면 다시 녹음할 수 있어요.');
      return;
    }

    userAudio.record();
    setTip('버튼을 누르면 녹음을 중단할 수 있어요.');
    setActive(true);
  };

  return (
    <div css={containerCss}>
      <RecordButton active={active} onClick={handleClick} />
      {tip && (
        <Typography color="secondary" size="xs">
          {tip}
        </Typography>
      )}
    </div>
  );
};

export default Record;
