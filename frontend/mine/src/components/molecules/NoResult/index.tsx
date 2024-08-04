/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, fitCss, textCss } from './style';
import { Icon, Typography } from 'oyc-ds';
import { CloudIcon } from '@heroicons/react/24/outline';

interface NoResultProps {
  fit?: boolean;
}

const NoResult = ({ fit = true }: NoResultProps) => {
  return (
    <div css={[containerCss, fit && fitCss]}>
      <Icon size="xl" color="secondary">
        <CloudIcon />
      </Icon>
      <Typography size="md" color="secondary" css={textCss}>
        검색 결과가 존재하지 않습니다.
      </Typography>
    </div>
  );
};

export default NoResult;
