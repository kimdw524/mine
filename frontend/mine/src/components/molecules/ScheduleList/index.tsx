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
import { ScheduleData } from '../../../apis/scheduleApi';

interface ScheduleListProps extends React.ComponentProps<'div'> {
  data: ScheduleData;
}

const ScheduleList = ({ data, ...props }: ScheduleListProps) => {
  return (
    <div css={containerCss} {...props}>
      <div css={iconWrapperCss}>
        <CategoryIcon color={scheduleCategoryData[data.categoryId].color}>
          {scheduleCategoryData[data.categoryId].icon}
        </CategoryIcon>
      </div>
      <div css={bodyCss}>
        <Typography size="md" color="dark">
          {data.title}
        </Typography>

        <Typography color="secondary" size="xs">
          {simpleFormatDate(new Date(data.startDateTime))} ~{' '}
          {simpleFormatDate(new Date(data.endDateTime))}
        </Typography>
        <Typography color="secondary" size="xs" css={detailCss}>
          <span css={categoryCss}>
            {scheduleCategoryData[data.categoryId].name}
          </span>
          {data.description}
        </Typography>
      </div>
    </div>
  );
};

export default ScheduleList;
