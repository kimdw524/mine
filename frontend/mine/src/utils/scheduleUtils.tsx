import {
  CakeIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  Square3Stack3DIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

export interface ScheduleCategory {
  id: number;
  name: string;
  color: string;
  icon: ReactNode;
}

export const scheduleCategoryData: Record<number, ScheduleCategory> = {
  1: {
    id: 1,
    name: '미정',
    color: '#eaeff1',
    icon: <EllipsisHorizontalIcon />,
  },
  2: { id: 2, name: '여행', color: '#ff8484', icon: <SunIcon /> },
  3: { id: 3, name: '외식', color: '#fcfca5', icon: <CakeIcon /> },
  4: {
    id: 4,
    name: '업무',
    color: '#d3e0f7',
    icon: <PresentationChartLineIcon />,
  },
  5: {
    id: 5,
    name: '약속',
    color: '#d0ffc7',
    icon: <ChatBubbleLeftRightIcon />,
  },
  6: { id: 6, name: '시험', color: '#b8e6ff', icon: <PencilSquareIcon /> },
  7: { id: 7, name: '기타', color: '#f1f1f1', icon: <Square3Stack3DIcon /> },
};
