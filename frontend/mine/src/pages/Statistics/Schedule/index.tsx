/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { MenuTab, Typography } from 'oyc-ds';
import DataTab from '../datatab';
import { boxCss, chartCss, labelboxCss, labelCss, manymsgCss, percentCss } from './style';
import { getDisplayTimeframe, scheduleData, getDateRange } from '../../../utils/SpendData';

// Chart.js 플러그인 및 설정 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const customLegendPlugin: Plugin<'doughnut'> = {
  id: 'customLegend',
  afterDatasetsDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!ctx || !chartArea) return;

    const data = chart.data.datasets[0].data as number[];
    const total = data.reduce((acc, val) => acc + val, 0);

    chart.data.labels?.forEach((label, index) => {
      const color = chart.data.datasets[0].backgroundColor as string[];
      const value = data[index];
      const percentage = ((value / total) * 100).toFixed(2);

      ctx.fillStyle = color[index];
      ctx.fillRect(chartArea.right + 10, chartArea.top + 20 * index, 10, 10);

      ctx.fillStyle = '#000';
      ctx.fillText(
        `${label}: ${percentage}%`,
        chartArea.right + 30,
        chartArea.top + 20 * index + 10,
      );
    });
  },
};

ChartJS.register(customLegendPlugin);

// 데이터 변환 함수
const transformScheduleData = (data: any[]) => {
  const labels = data.map(item => item.name);
  const counts = data.map(item => item.count);
  const backgroundColor = data.map(item => item.color);

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

const Schedule = () => {
  const [offset, setOffset] = useState(0);
  const [period, setPeriod] = useState('monthly');
  const nav = useNavigate();
  const chartRef = useRef<ChartJS<'doughnut'>>(null);

  const handleMenuChange = (menu: number) => {
    switch (menu) {
      case 0:
        setPeriod('monthly');
        setOffset(0);
        break;
      case 1:
        setPeriod('yearly');
        setOffset(0);
        break;
      default:
        break;
    }
  };

  // 날짜 범위 계산
  const { startDate, endDate } = getDateRange(period, offset);

  // 데이터 필터링
  const filteredScheduleData = scheduleData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  // 필터링된 데이터가 없다면 로그를 찍어 확인
  useEffect(() => {
    console.log('Filtered Data:', filteredScheduleData);
  }, [offset, period]);

  // 데이터 변환
  const scheduledata = transformScheduleData(filteredScheduleData);

  // 필터링된 데이터가 없으면 기본값 설정
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
      <AppBar label="일정 통계" onBackClick={() => nav('/')} />
      <MenuTab
        color="light"
        size="sm"
        variant="rounded"
        onChangeMenu={handleMenuChange}
      >
        <div>월간</div>
        <div>연간</div>
      </MenuTab>
      <DataTab
        title={getDisplayTimeframe(period, offset)}
        leftChild={
          <Typography
            color="dark"
            size="md"
            weight="medium"
            onClick={() => setOffset(offset + 1)}
          >
            {`<`}
          </Typography>
        }
        rightChild={
          <Typography
            color="dark"
            size="md"
            weight="medium"
            onClick={() => setOffset(offset - 1)}
          >
            {`>`}
          </Typography>
        }
      />
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
  );
};

export default Schedule;