/** @jsxImportSource @emotion/react */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { containerCss, msgCss } from './analysis.style';
import { Typography } from 'oyc-ds';
import { useSuspenseQuery } from '@tanstack/react-query';
import { spendMsg } from '../../../apis/statisticsApi';
import { calculateDateRange } from '../../../utils/SpendData';

ChartJS.register(ChartDataLabels);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 데이터 전주 대비
// 지난 주 데이터와 이번주 데이터를 가지고 차트 data에 넣기

// 분석메시지는 그냥 받은 메시지 주면 됨

// interface CustomDataPoint {
//   week: string;
//   expense: number;
//   color: string;
// }


interface SpendChartProps {
  period: string;
  offset: number;
  curSum?: number;
  analysis?: string;
  preSum?: number;
}

const Analysis: React.FC<SpendChartProps> = ({ period, offset, curSum }) => {
  const { startDate, endDate } = calculateDateRange(period, offset);
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['spendmsg', period, offset],
    queryFn: async () => {
      const result = await spendMsg(startDate, endDate);
      console.log(result);
      return result;
    },
  });

  if (error && !isFetching) {
    throw error;
  }

  const barData = {
    labels: ['이전 합계', '현재 합계'],
    datasets: [
      {
        label: '합계 비교',
        data: [data.data.prevSum, curSum],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => `${value}원`,
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
        // 최대 값 설정 (예: 60000)
        max: 80000,
      },
      y: {
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div css={containerCss}>
      {/* <h1>{curSum}</h1> */}
      {curSum ? (
        <h2>저번 주에 비해 {curSum - data?.data.prevSum}원 더 썼어요!</h2>  
      ) : null }
      <Bar data={barData} options={options} height={'80%'}/>
      <div css={msgCss}>
        <h3>소비 패턴 분석 메시지</h3>
        <div>{data?.data.analysis}</div>
      </div>
    </div>
  );
};

export default Analysis;
