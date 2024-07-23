/** @jsxImportSource @emotion/react */
import React from 'react';
import { Icon, Typography } from 'oyc-ds';
import { containerCss } from './style';
import { engToIcon } from '../../../utils/EngToIcon';
import { Palette } from 'oyc-ds/dist/themes/lightTheme';
import { engToKor } from '../../../utils/EngToKor';

interface IconTypographyProps {
  label: string;
  color: Palette;
}

const IconTypography = ({ label, color }: IconTypographyProps) => {
  return (
    <div css={containerCss}>
      <Icon color={color}>{engToIcon[label]}</Icon>
      <Typography color="dark" size="sm" weight="medium">
        {engToKor[label]}
      </Typography>
    </div>
  );
};

export default IconTypography;
