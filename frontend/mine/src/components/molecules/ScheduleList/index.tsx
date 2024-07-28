/** @jsxImportSource @emotion/react */
import React from 'react';
import Category from './Category';
import Title from './Title';
import Description from './Description';
import Place from './Place';
import { css } from '@emotion/react';
import useLongPress from '../../../hooks/useLongPress';

const containerCss = css`
  position: relative;
  padding: 0.875rem 0;
  user-select: none;

  :not(:last-child) {
    border-bottom: 0.0625rem solid #eee;
  }
`;

const ScheduleList = ({ children, ...props }: React.ComponentProps<'div'>) => {
  const { ref, ripple } = useLongPress<HTMLDivElement>(() => {
    alert('longPress');
  });

  return (
    <div css={containerCss} ref={ref} {...props}>
      {ripple}
      {children}
    </div>
  );
};

ScheduleList.Category = Category;
ScheduleList.Title = Title;
ScheduleList.Description = Description;
ScheduleList.Place = Place;

export default ScheduleList;
