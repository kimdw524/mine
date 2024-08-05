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

interface CustomDataPoint {
  week: string;
  expense: number;
  color: string;
}

const spend: CustomDataPoint[] = [
  { week: '저번 주', expense: 10000, color: '#EEE1FF' },
  { week: '이번 주', expense: 50000, color: '#CDB7FF' },
];

const data: ChartData<'bar', number[], string> = {
  labels: spend.map((s) => s.week),
  datasets: [
    {
      data: spend.map((s) => s.expense),
      backgroundColor: spend.map((s) => s.color),
      borderColor: spend.map((s) => s.color),
      borderWidth: 1,
      borderRadius: 8,
    },
  ],
};

const Analysis: React.FC = () => {
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
      <h2>저번 주에 비해 40000원 더 썼어요!</h2>
      <Bar data={data} options={options} height={'80%'}/>
      <div css={msgCss}>
        <h3>소비 패턴 분석 메시지</h3>
        <Typography color="secondary" size="xs" weight="medium">
          배달 그만 무!
        </Typography>
      </div>
    </div>
  );
};

export default Analysis;
