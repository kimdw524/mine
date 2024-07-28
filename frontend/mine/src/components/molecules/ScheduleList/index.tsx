/** @jsxImportSource @emotion/react */
import React from 'react';
import { GiftIcon } from '@heroicons/react/24/outline';
import { Typography } from 'oyc-ds';
import { bodyCss, categoryCss, containerCss, iconWrapperCss } from './style';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';

interface ScheduleListProps extends React.ComponentProps<'div'> {
  title: string;
  description: string;
  category: number;
}

const ScheduleList = ({
  title,
  description,
  category,
  ...props
}: ScheduleListProps) => {
  return (
    <div css={containerCss} {...props}>
      <div css={iconWrapperCss}>
        <GiftIcon />
      </div>
      <div css={bodyCss}>
        <Typography size="md" color="dark">
          {title}
        </Typography>
        <Typography color="secondary" size="sm" weight="light">
          <span css={categoryCss}>{scheduleCategoryData[category].name}</span>
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default ScheduleList;
