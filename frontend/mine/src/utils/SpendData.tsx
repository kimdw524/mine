import React from "react";
import { apiFormatDate } from "./dateUtils";

export interface Spend {
  spendCategoryId?: number;
  categorySum?: number;
  name?: string;
  color?: string;
}

export interface DisplayData extends Spend {
  name: string;
  color: string;
}

export type Income = {
  id: number;
  money: number; // 금액
  date: string; // 생성일시
}

// id만 제공 id로 name을 찾아서 연결

// export const spend: Spend[] = [
//   { id: 1, name: '미정', color: '#FFB0C4' },
//   { id: 2, name: '여행',  color: ' #ADD8E6' },
//   { id: 3, name: '음식', color: ' #FFFFE0' },
//   { id: 4, name: '문화',  color: '#DDA0DD' },
//   { id: 5, name: '의료', color: '#AFEEEE' },
//   { id: 6, name: '유흥', color: '#98FB98' },
//   { id: 7, name: '미용', color: '#FF7F50' },
//   { id: 8, name: '교통',  color: '#E6E6FA' },
//   { id: 9, name: '생활',  color: '#7FFFD4' },
//   { id: 10, name: '교육', color: '#FFFFF0' },
//   { id: 11, name: '통신', color: '#eee1ff' },
//   {
//     id: 12,
//     name: '경조사',
//     color: '#cdb7ff',
//   },
//   { id: 13, name: 'OTT', color: '#9e92f4' },
//   { id: 14, name: '주거',  color: '#6f78c7' },
//   { id: 15, name: '기타', color: '#535d90' },
// ];
// export const income: Income[] = [
//   { id: 1, money: 10000, date: '2024-07-18'},
//   { id: 2, money: 100000, date: '2024-07-19'},
//   { id: 3, money: 50000, date: '2024-07-20' },
//   { id: 4, money: 170000, date: '2024-07-21'},
//   { id: 5, money: 30000, date: '2024-07-22' },
//   { id: 6, money: 100000, date: '2024-07-23'},
//   { id: 7, money: 10000, date: '2024-07-24' },
//   { id: 8, money: 20000, date: '2024-07-29' },
//   { id: 9, money: 10000, date: '2024-08-01' },
//   { id: 10, money: 30000, date: '2024-08-02'},
//   { id: 11, money: 40000, date: '2024-08-06'},
//   { id: 12, money: 50000, date: '2024-08-07'},
//   { id: 13, money: 20000, date: '2024-08-08'},
//   { id: 14, money: 300000, date: '2024-08-09'},
//   { id: 15, money: 20000, date: '2024-08-10' },
// ];


// export const income: Spend[] = [
//   { id: 1, name: '미정', money: 10000, date: '2024-07-18', color: '#FFB0C4'},
//   { id: 2, name: '여행', money: 100000, date: '2024-07-19', color: ' #ADD8E6' },
//   { id: 3, name: '음식', money: 50000, date: '2024-07-20' , color: ' #FFFFE0'},
//   { id: 4, name: '문화', money: 170000, date: '2024-07-21', color: '#DDA0DD' },
//   { id: 5, name: '의료', money: 30000, date: '2024-07-22' , color: '#AFEEEE'},
//   { id: 6, name: '유흥', money: 100000, date: '2024-07-23', color: '#98FB98' },
//   { id: 7, name: '미용', money: 10000, date: '2024-07-24' , color: '#FF7F50'},
//   { id: 8, name: '교통', money: 20000, date: '2024-07-29' , color: '#E6E6FA'},
//   { id: 9, name: '생활', money: 10000, date: '2024-08-01' , color: '#7FFFD4'},
//   { id: 10, name: '교육', money: 30000, date: '2024-08-02', color:'#FFFFF0' },
//   { id: 11, name: '통신', money: 40000, date: '2024-08-06', color: '#eee1ff'},
//   { id: 12, name: '경조사', money: 50000, date: '2024-08-07' , color: '#cdb7ff'},
//   { id: 13, name: 'OTT', money: 20000, date: '2024-08-08', color: '#9e92f4' },
//   { id: 14, name: '주거', money: 300000, date: '2024-08-09' , color: '#6f78c7'},
//   { id: 15, name: '기타', money: 20000, date: '2024-08-10' , color: '#535d90'},
// ];

export type SheduleData = {
  id: number;
  name: string;
  count: number;
  date: string;
  color: string;
}

export const scheduleData: SheduleData[] = [
  {id: 1, name: '미정', count: 1, date: '2024-07-18', color: '#eaeff1'},
  {id: 2, name: '여행', count: 2, date: '2024-07-19', color: '#ff8484'},
  {id: 3, name: '외식', count: 7, date: '2024-07-20', color: '#fcfca5'},
  {id: 4, name: '업무', count: 4, date: '2024-08-01', color: '#d3e0f7'},
  {id: 5, name: '약속', count: 5, date: '2024-08-02', color: '#d0ffc7'},
  {id: 6, name: '시험', count: 6, date: '2024-08-03', color: '#b8e6ff'},
  {id: 7, name: '기타', count: 7, date: '2024-08-04', color: '#f1f1f1'},
]



export interface Timeframe {
  startDate: string;
  endDate: string;
  title: string;
}

export const getDisplayTimeframe = (period: string, offset: number): Timeframe => {
  const today = new Date();
  let startDate: string;
  let endDate: string;
  let title: string;

  startDate = '';
  endDate = '';
  title = '';

  if (period === 'weekly') {
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7 * offset);
    const previousWeekEnd = new Date(previousWeekStart);
    previousWeekEnd.setDate(previousWeekStart.getDate() + 6);
    startDate = apiFormatDate(previousWeekStart);
    endDate = apiFormatDate(previousWeekEnd);
    title = `${previousWeekStart.getFullYear()}년 ${previousWeekStart.getMonth() + 1}월 ${previousWeekStart.getDate()}일 ~ ${previousWeekEnd.getFullYear()}년 ${previousWeekEnd.getMonth() + 1}월 ${previousWeekEnd.getDate()}일`;
  } else if (period === 'monthly') {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const adjustedDate = new Date(currentYear, currentMonth - offset, 1);
    startDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 1));
    endDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0));
    title = `${adjustedDate.getFullYear()}년 ${adjustedDate.getMonth() + 1}월`;
  } else if (period === 'yearly') {
    const currentYear = today.getFullYear();
    const adjustedYear = currentYear - offset;
    startDate = `${adjustedYear}-01-01`;
    endDate = `${adjustedYear}-12-31`;
    title = `${adjustedYear}년`;
  }

  return { startDate, endDate, title };
};

export const getDateRange = (period: string, offset: number) => {
  const today = new Date();
  
  if (period === 'monthly') {
    const year = today.getFullYear();
    const month = today.getMonth();
    const startDate = new Date(year, month - offset, 1);
    const endDate = new Date(year, month - offset + 1, 0);
    return { startDate, endDate };
  }

  if (period === 'yearly') {
    const year = today.getFullYear();
    const startDate = new Date(year - offset, 0, 1);
    const endDate = new Date(year - offset + 1, 0, 0);
    return { startDate, endDate };
  }

  // 기본값
  return { startDate: today, endDate: today };
};


// 날짜 범위를 계산하여 API 요청 형식으로 변환
export const calculateDateRange = (period: string, offset: number) => {
  const today = new Date();
  let startDate: string;
  let endDate: string;

  // 기본값 할당
  startDate = '';
  endDate = '';

  if (period === 'weekly') {
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7 * offset);
    const previousWeekEnd = new Date(previousWeekStart);
    previousWeekEnd.setDate(previousWeekStart.getDate() + 6);
    startDate = apiFormatDate(previousWeekStart);
    endDate = apiFormatDate(previousWeekEnd);
  } else if (period === 'monthly') {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const adjustedDate = new Date(currentYear, currentMonth - offset, 1);
    startDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 1));
    endDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0));
  } else if (period === 'yearly') {
    const currentYear = today.getFullYear();
    const adjustedYear = currentYear - offset;
    startDate = `${adjustedYear}-01-01`;
    endDate = `${adjustedYear}-12-31`;
  }

  // 변수가 초기화되지 않은 경우 기본값을 설정
  if (!startDate || !endDate) {
    throw new Error('Date range could not be determined');
  }

  return { startDate, endDate };
};