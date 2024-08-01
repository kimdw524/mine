/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography } from 'oyc-ds';
import {
  bodyCss,
  categoryCss,
  containerCss,
  detailCss,
  iconWrapperCss,
} from './style';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';
import { simpleFormatDate } from '../../../utils/dateUtils';
import CategoryIcon from '../../atoms/CategoryIcon';

interface ScheduleListProps extends React.ComponentProps<'div'> {
  title: string;
  description: string;
  category: number;
  startDateTime: string;
  endDateTime: string;
}

const ScheduleList = ({
  title,
  description,
  category,
  startDateTime,
  endDateTime,
  ...props
}: ScheduleListProps) => {
  return (
    <div css={containerCss} {...props}>
      <div css={iconWrapperCss}>
        <CategoryIcon color={scheduleCategoryData[category].color}>
          {scheduleCategoryData[category].icon}
        </CategoryIcon>
      </div>
      <div css={bodyCss}>
        <Typography size="md" color="dark">
          {title}
        </Typography>

        <Typography color="secondary" size="xs">
          {simpleFormatDate(new Date(startDateTime))} ~{' '}
          {simpleFormatDate(new Date(endDateTime))}
        </Typography>
        <Typography color="secondary" size="xs" css={detailCss}>
          <span css={categoryCss}>{scheduleCategoryData[category].name}</span>
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default ScheduleList;
