/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import {
  buttonCss,
  containerCss,
  descriptionCss,
  headCss,
  infoCss,
  modalCss,
  periodCss,
} from './style';
import { ScheduleData } from '../../../apis/scheduleApi';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { iconWrapperCss } from '../../../components/molecules/ScheduleList/style';
import { scheduleCategoryData } from '../../../utils/scheduleUtils';
import { Button, Typography } from 'oyc-ds';
import { simpleFormatDate } from '../../../utils/dateUtils';

interface DetailViewProps {
  data: ScheduleData;
}

const DetailView = ({ data }: DetailViewProps) => {
  const navigate = useNavigate();

  return (
    <div css={modalCss}>
      <AppBar label="내 일정" onBackClick={() => navigate(-1)} />
      <div css={containerCss}>
        <div css={headCss}>
          <div
            css={iconWrapperCss}
            style={
              {
                '--color': scheduleCategoryData[data.categoryId].color,
              } as CSSProperties
            }
          >
            {scheduleCategoryData[data.categoryId].icon}
          </div>
          <div css={infoCss}>
            <Typography color="dark" size="lg">
              {data.title}
            </Typography>
            <Typography color="dark" size="sm">
              {scheduleCategoryData[data.categoryId].name}
            </Typography>
          </div>
        </div>
        <div css={periodCss}>
          <div css={infoCss}>
            <Typography color="dark" size="sm">
              시작일
            </Typography>
            <Typography color="secondary" size="md">
              {simpleFormatDate(new Date(data.startDateTime))}
            </Typography>
          </div>
          <div css={infoCss}>
            <Typography color="dark" size="sm">
              종료일
            </Typography>
            <Typography color="secondary" size="md">
              {simpleFormatDate(new Date(data.endDateTime))}
            </Typography>
          </div>
        </div>
        <div css={descriptionCss}>{data.description}</div>
        <div css={buttonCss}>
          <Button color="danger">삭제</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
