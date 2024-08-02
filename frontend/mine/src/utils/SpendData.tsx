import React from 'react';

export type Spend = {
  id: number; // 카테고리 아이디
  name: string; // 카테고리 이름
  money: number; // 금액
  date: string; // 생성일시
  color: string;
};

// id만 제공 id로 name을 찾아서 연결

export const spend: Spend[] = [
  { id: 1, name: '미정', money: 10000, date: '2024-07-18', color: '#FFB0C4'},
  { id: 2, name: '여행', money: 100000, date: '2024-07-19', color: ' #ADD8E6' },
  { id: 3, name: '음식', money: 50000, date: '2024-07-20' , color: ' #FFFFE0'},
  { id: 4, name: '문화', money: 170000, date: '2024-07-21', color: '#DDA0DD' },
  { id: 5, name: '의료', money: 30000, date: '2024-07-22' , color: '#AFEEEE'},
  { id: 6, name: '유흥', money: 100000, date: '2024-07-23', color: '#98FB98' },
  { id: 7, name: '미용', money: 10000, date: '2024-07-24' , color: '#FF7F50'},
  { id: 8, name: '교통', money: 20000, date: '2024-07-29' , color: '#E6E6FA'},
  { id: 9, name: '생활', money: 10000, date: '2024-08-01' , color: '#7FFFD4'},
  { id: 10, name: '교육', money: 30000, date: '2024-08-02', color:'#FFFFF0' },
  { id: 11, name: '통신', money: 40000, date: '2024-08-06', color: '#eee1ff'},
  { id: 12, name: '경조사', money: 50000, date: '2024-08-07' , color: '#cdb7ff'},
  { id: 13, name: 'OTT', money: 20000, date: '2024-08-08', color: '#9e92f4' },
  { id: 14, name: '주거', money: 300000, date: '2024-08-09' , color: '#6f78c7'},
  { id: 15, name: '기타', money: 20000, date: '2024-08-10' , color: '#535d90'},
];
