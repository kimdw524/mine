/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Typography } from 'oyc-ds';
import { boxCss, chartCss, labelboxCss, labelCss, manymsgCss, percentCss } from './style';
import { useSuspenseQuery } from '@tanstack/react-query';
import { calculateDateRange } from '../../../utils/SpendData';
import { scheduleInfo } from '../../../apis/statisticsApi';
import Preview from '../Preview';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const categories: Record<number, { name: string; color: string }> = {
  1: { name: '미정', color: '#FFB0C4' },
  2: { name: '여행', color: '#ADD8E6' },
  3: { name: '외식', color: '#FFFFE0' },
  4: { name: '업무', color: '#DDA0DD' },
  5: { name: '약속', color: '#AFEEEE' },
  6: { name: '시험', color: '#98FB98' },
  7: { name: '기타', color: '#FF7F50' },
};

const transformScheduleData = (data: { categoryId: number; count: number }[]) => {
  const labels = data.map(item => categories[item.categoryId]?.name || '없음');
  const counts = data.map(item => item.count);
  const backgroundColor = data.map(item => categories[item.categoryId]?.color || '#FFFFFF');

  return {
    labels,
    datasets: [{
      label: '일정 분포',
      data: counts,
      backgroundColor,
      hoverOffset: 4,
    }],
  };
};

interface SpendChartProps {
  period: string;
  offset: number;
}

const Schedule: React.FC<SpendChartProps> = ({ period, offset }) => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);

  const { startDate, endDate } = calculateDateRange(period, offset);

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['scheduleinfo', period, offset],
    queryFn: async () => {
      const result = await scheduleInfo(startDate, endDate);
      console.log('API response:', result);
      return result;
    },
  });

  if (error && !isFetching) {
    throw error;
  }

  const scheduleData = data.data || [];
  const scheduledata = transformScheduleData(scheduleData);

  const maxIndex = scheduledata.datasets[0]?.data.indexOf(
    Math.max(...scheduledata.datasets[0]?.data || [0]),
  ) || 0;
  const maxLabel = scheduledata.labels[maxIndex] || '없음';
  const maxColor = scheduledata.datasets[0]?.backgroundColor[maxIndex] || '#FFFFFF';

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <>
      {scheduledata.labels.length === 0 ? (
        <Preview content="일정이" button="일정" url="schedule" /> // `Preview` 컴포넌트 사용
      ) : (
        <>
          <Typography
            color="dark"
            size="sm"
            weight="medium"
            css={manymsgCss}
          >
            <span
              className='maxLabel'
              style={{
                backgroundColor: maxColor,
              }}
            >
              {maxLabel}
            </span> 일정이 가장 많았어요!
          </Typography>
          <section css={boxCss}>
            <div className='title' style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography
                color="dark"
                size="md"
                weight="bold"
              >
                카테고리 비율
              </Typography>
              <Doughnut ref={chartRef} data={scheduledata} options={options} css={chartCss} />
            </div>
            <div css={labelboxCss} style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {scheduledata.labels.map((label, index) => {
                const value = scheduledata.datasets[0]?.data[index] || 0;
                const total = scheduledata.datasets[0]?.data.reduce((acc, val) => acc + val, 0) || 1;
                const percentage = ((value / total) * 100).toFixed(2);
                return (
                  <div key={index} css={labelCss}>
                    <span css={percentCss} style={{ backgroundColor: scheduledata.datasets[0]?.backgroundColor[index] }}>
                      {label}
                    </span> {percentage}%
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
};


export default Schedule;
