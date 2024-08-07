/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
import { spend, income, Spend } from '../../../utils/SpendData';
import {
  containerCss,
  itemsCss,
  spendCss,
  itembarCss,
  itemlabelCss,
  itempriceCss,
  allbtnCss,
} from './spend.style';
import { Typography, Button } from 'oyc-ds';
import { filterExpenses } from '../../../utils/expensefilter';
import Analysis from './analysis';
import Preview from '../Preview/spend';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const expenses = spend;
export const incomes = income;

interface SpendChartProps {
  period: string;
  offset: number;
}

const SpendChart: React.FC<SpendChartProps> = ({ period, offset }) => {
  const [dataType, setDataType] = useState('spend'); // 지출/수입 데이터 타입 상태
  const [showAll, setShowAll] = useState(false); // 전체 보기 상태

  const data = dataType === 'spend' ? expenses : incomes;
  const filteredData = filterExpenses(data, period, offset).sort(
    (a, b) => b.money - a.money,
  ) as Spend[];
  const totalexpenditure = filteredData.reduce(
    (acc, expense) => acc + expense.money,
    0,
  );

  const topCategories = filteredData.slice(0, 4);
  const otherCategories = filteredData.slice(4);
  const otherTotal = otherCategories.reduce((acc, item) => acc + item.money, 0);

  // 카테고리가 6개 이상일 때만 otherCategory 추가
  const displayData =
    showAll || filteredData.length <= 5
      ? filteredData
      : [
          ...topCategories,
          {
            id: 'other',
            name: '그 외 카테고리',
            money: otherTotal,
            color: '#cccccc',
          },
        ];

  const chartData = {
    labels: ['비율'],
    datasets: displayData.map((expense, index) => ({
      label: expense.name,
      data:
        totalexpenditure > 0 ? [(expense.money / totalexpenditure) * 100] : [0],
      backgroundColor: expense.color,
      borderSkipped: false,
      borderRadius: {
        topLeft: index === 0 ? 8 : 0,
        bottomLeft: index === 0 ? 8 : 0,
        topRight: index === displayData.length - 1 ? 8 : 0,
        bottomRight: index === displayData.length - 1 ? 8 : 0,
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
    <div css={containerCss}>
      {filteredData.length > 0 ? (
        <>
          <Typography color="dark" size="lg" weight="bold" css={spendCss}>
            총 {totalexpenditure.toLocaleString()}원을
            <br />
            {dataType === 'spend' ? '소비했어요' : '벌었어요'}
          </Typography>
          <Bar data={chartData} options={options} height={'50%'} />
          <div>
            {displayData.map((item) => {
              const percentage =
                totalexpenditure > 0
                  ? ((item.money / totalexpenditure) * 100).toFixed(2)
                  : 0;
              return (
                <section key={item.id} css={itemsCss}>
                  <div
                    css={itembarCss}
                    style={{ backgroundColor: item.color }}
                  />
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
          </div>
          {filteredData.length > 5 && (
            <Button
              css={allbtnCss}
              color="primary"
              size="sm"
              variant="contained"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? '접기' : '카테고리 전체 보기'}
            </Button>
          )}
          <Analysis />
        </>
      ) : (
        <Preview />
      )}
    </div>
  );
};

export default SpendChart;
