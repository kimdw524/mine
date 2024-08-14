/** @jsxImportSource @emotion/react */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  containerCss,
  itemsCss,
  spendCss,
  itembarCss,
  itemlabelCss,
  itempriceCss,
  backdropCss,
  navchartCss,
  contentCss,
} from '../Account/Spend/spend.style';
import { Typography, Button } from 'oyc-ds';
import Analysis from '../Account/Spend/analysis';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export type Spend = {
  name: string; // 카테고리 이름
  money: number; // 금액
  color: string;
};
const spend: Spend[] = [
  { name: '음식', money: 200000, color: '#eee1ff' },
  { name: '생활', money: 50000, color: '#cdb7ff' },
  { name: 'OTT', money: 40000, color: '#9e92f4' },
  { name: '주거', money: 30000, color: '#6f78c7' },
  { name: '기타', money: 10000, color: '#535d90' },
];

const Preview = () => {
  const nav = useNavigate();
  const chartData = {
    labels: ['비율'],
    datasets: spend.map((expense, index) => ({
      data: [(expense.money / 33000) * 100],
      backgroundColor: expense.color,
      borderSkipped: false,
      borderRadius: {
        topLeft: index === 0 ? 8 : 0,
        bottomLeft: index === 0 ? 8 : 0,
        topRight: index === 4 ? 8 : 0,
        bottomRight: index === 4 ? 8 : 0,
      },
      stack: 'stack1',
    })),
  };

  const options = {
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <section css={containerCss}>
      <div css={backdropCss}>
        <div css={contentCss}>
          <div className="preview-text">미리보기 화면입니다.</div>
        </div>
      </div>
      <Button
        css={navchartCss}
        color="primary"
        size="sm"
        variant="contained"
        onClick={() => nav('/account')}
      >
        가계부 등록하러 가기
      </Button>
      <Typography color="dark" size="lg" weight="bold" css={spendCss}>
        총 330,000원을
        <br />
        소비했어요
      </Typography>
      <Bar data={chartData} options={options} height={'50%'} />
      <div>
        {spend.map((item) => {
          const percentage = ((item.money / 330000) * 100).toFixed(2);
          return (
            <section key={item.name} css={itemsCss}>
              <div css={itembarCss} style={{ backgroundColor: item.color }} />
              <div css={itemlabelCss}>
                <Typography color="dark" size="md" weight="medium">
                  {item.name}
                </Typography>
                <Typography color="secondary" size="xs" weight="medium">
                  {percentage}%
                </Typography>
              </div>
              <Typography
                color="dark"
                size="sm"
                weight="bold"
                css={itempriceCss}
              >
                {item.money.toLocaleString()}원
              </Typography>
            </section>
          );
        })}
        {/* <Analysis /> */}
      </div>
    </section>
  );
};
export default Preview;
