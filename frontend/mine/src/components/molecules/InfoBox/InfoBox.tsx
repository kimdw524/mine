/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon, Typography } from 'oyc-ds';
import { infoBoxCss, infoBoxTitleCss } from './style';
import { engToKor } from '../../../utils/EngToKor';
import { engToIcon } from '../../../utils/EngToIcon';

interface InfoBoxProps {
  label: string;
  content: string;
}

const InfoBox = ({ label, content }: InfoBoxProps) => {
  return (
    <div css={infoBoxCss(content)}>
      <div css={infoBoxTitleCss}>
        <Icon>{engToIcon[label]}</Icon>
        <Typography size="sm" color="dark">
          {engToKor[label]}
        </Typography>
      </div>
      <Typography size="sm" color="dark">
        {content}
      </Typography>
    </div>
  );
};

export default InfoBox;
