/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
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
import { chartCss, manymsgCss } from './style';

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

const Schedule = () => {
  const [offset, setOffset] = useState(0);
  const [period, setPeriod] = useState('weekly');
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

  const getDisplayTimeframe = (): JSX.Element => {
    const today = new Date();
    let displayText: JSX.Element = <div></div>;

    if (period === 'monthly') {
      const currentMonth = today.getMonth();
      const monthNames = [
        '1월', '2월', '3월', '4월', '5월', '6월', 
        '7월', '8월', '9월', '10월', '11월', '12월'
      ];
      displayText = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>
            {monthNames[currentMonth - offset]}
          </span>
        </div>
      );
    } else if (period === 'yearly') {
      const currentYear = today.getFullYear();
      displayText = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>{currentYear - offset}년</span>
        </div>
      );
    }

    return displayText;
  };

  const scheduleData = {
    labels: ['회의', '업무', '교육', '휴식', '기타'],
    datasets: [
      {
        label: '일정 분포',
        data: [10, 20, 30, 25, 15],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const maxIndex = scheduleData.datasets[0].data.indexOf(
    Math.max(...scheduleData.datasets[0].data),
  );
  const maxLabel = scheduleData.labels[maxIndex];

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        // 다른 옵션들을 여기에 추가할 수 있습니다.
      },
    },
  };

  return (
    <>
      <AppBar label="가계 통계" onBackClick={() => nav('/')} />
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
        title={getDisplayTimeframe()}
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
      <div css={manymsgCss}><span className='maxLabel'>{maxLabel}</span> 일정이 가장 많았어요!</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', margin: '1rem', border:'1px solid #EEE', padding: '0.2rem'}}>
  <div style={{ flex: '1', marginRight: '20px', textAlign: 'center' }}>
    <h3>카테고리 비율</h3>
    <Doughnut ref={chartRef} data={scheduleData} options={options} css={chartCss} />
  </div>
  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
    {scheduleData.labels.map((label, index) => {
      const value = scheduleData.datasets[0].data[index];
      const total = scheduleData.datasets[0].data.reduce(
        (acc, val) => acc + val,
        0,
      );
      const percentage = ((value / total) * 100).toFixed(2);
      return (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px',
           
          }}
        >
          <span>
            <span  
              style={{
                padding: '0.2rem 1rem',
                borderRadius: '20px',
                backgroundColor: scheduleData.datasets[0].backgroundColor[index],
                marginRight: '10px',
              }}>
              {label}
            </span> {percentage}%
          </span>
        </div>
      );
    })}
  </div>
</div>


    </>
  );
};

export default Schedule;
