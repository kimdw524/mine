/** @jsxImportSource @emotion/react */
import { PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import React, { CSSProperties } from 'react';
import { activeCss, containerCss, inactiveCss } from './style';
import { useTheme } from '@emotion/react';

interface RecordButtonProps {
  active: boolean;
  onClick: () => void;
}

/**
 * 문장 읽기 페이지에서 사용할 음성 녹음 버튼
 */
const RecordButton = ({ active, onClick }: RecordButtonProps) => {
  const theme = useTheme();

  return (
    <div
      onClick={onClick}
      css={[containerCss, active ? activeCss : inactiveCss]}
      style={
        {
          '--inactive-bg': theme.colors.light.active,
          '--inactive-color': theme.colors.secondary.main,
          '--active-bg': theme.colors.primary.main,
          '--active-color': theme.colors.primary.contrastText,
        } as CSSProperties
      }
    >
      <PlayIcon className="inactive" />
      <StopIcon className="active" />
    </div>
  );
};

export default RecordButton;
