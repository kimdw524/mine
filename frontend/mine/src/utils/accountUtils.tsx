import {
  BeakerIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  ScissorsIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  SunIcon,
  TruckIcon,
  TvIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';

export interface AccountCategory {
  id: number;
  name: string;
  color: string;
  icon: ReactNode;
}

export const accountCategoryData: Record<number, AccountCategory> = {
  1: {
    id: 1,
    name: '미정',
    color: '#eaeff1',
    icon: <EllipsisHorizontalIcon />,
  },
  2: { id: 2, name: '여행', color: '#ff8484', icon: <SunIcon /> },
  3: { id: 3, name: '음식', color: '#fcfca5', icon: <CakeIcon /> },
  4: {
    id: 4,
    name: '문화',
    color: '#d3e0f7',
    icon: <PresentationChartLineIcon />,
  },
  5: {
    id: 5,
    name: '의료',
    color: '#d0ffc7',
    icon: <ChatBubbleLeftRightIcon />,
  },
  6: { id: 6, name: '유흥', color: '#b8e6ff', icon: <BeakerIcon /> },
  7: { id: 7, name: '미용', color: '#fcceff', icon: <ScissorsIcon /> },
  8: { id: 8, name: '교통', color: '#f3e7e7', icon: <TruckIcon /> },
  9: { id: 9, name: '생활', color: '#9dffd7', icon: <ShoppingBagIcon /> },
  10: { id: 10, name: '교육', color: '#ffce3c', icon: <PencilSquareIcon /> },
  11: { id: 11, name: '통신', color: '#b8d0dd', icon: <WifiIcon /> },
  12: { id: 12, name: '경조사', color: '#ffa6a6', icon: <PencilSquareIcon /> },
  13: { id: 13, name: 'OTT', color: '#41bcff', icon: <TvIcon /> },
  14: { id: 14, name: '주거', color: '#c2ffb8', icon: <HomeIcon /> },
  15: {
    id: 15,
    name: '기타',
    color: '#f1f1f1',
    icon: <EllipsisHorizontalIcon />,
  },
  99: { id: 99, name: '수입', color: '#f1f1f1', icon: <Square3Stack3DIcon /> },
};
