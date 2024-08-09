/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
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
  allbtnCss,
} from './spend.style';
import { Typography, Button } from 'oyc-ds';
import Analysis from './analysis';
import Preview from '../../Preview';
import { useSuspenseQuery } from '@tanstack/react-query';
import { calculateDateRange } from '../../../../utils/SpendData';
import { spendInfo } from '../../../../apis/statisticsApi';
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

interface SpendChartProps {
  period: string;
  offset: number;
}

const categories: Record<number, { name: string; color: string }> = {
  1: { name: '미정', color: '#FFB0C4' },
  2: { name: '여행', color: '#ADD8E6' },
  3: { name: '음식', color: '#FFFFE0' },
  4: { name: '문화', color: '#DDA0DD' },
  5: { name: '의료', color: '#AFEEEE' },
  6: { name: '유흥', color: '#98FB98' },
  7: { name: '미용', color: '#FF7F50' },
  8: { name: '교통', color: '#E6E6FA' },
  9: { name: '생활', color: '#7FFFD4' },
  10: { name: '교육', color: '#FFFFF0' },
  11: { name: '통신', color: '#eee1ff' },
  12: { name: '경조사', color: '#cdb7ff' },
  13: { name: 'OTT', color: '#9e92f4' },
  14: { name: '주거', color: '#6f78c7' },
  15: { name: '기타', color: '#535d90' },
};

const SpendChart: React.FC<SpendChartProps> = ({ period, offset }) => {
  const [showAll, setShowAll] = useState(false);
  const { startDate, endDate } = calculateDateRange(period, offset);

  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['spendinfo', period, offset],
    queryFn: async () => {
      const result = await spendInfo(startDate, endDate);
      return result;
    },
  });

  if (error && !isFetching) {
    throw error;
  }

  interface itemTypes {
    spendCategoryId: number;
    categorySum: number;
    name?: string;
    color?: string;
  }

  const filteredData = data.data
    .map((data: itemTypes) => ({
      ...data,
      name: categories[data.spendCategoryId]?.name || '기타',
      color: categories[data.spendCategoryId]?.color || '#535d90',
    }))
    .sort((a: itemTypes, b: itemTypes) => b.categorySum - a.categorySum);

  const totalExpenditure = filteredData.reduce(
    (acc: number, data: itemTypes) => acc + (data.categorySum || 0),
    0,
  );

  const topCategories = filteredData.slice(0, 4);
  const otherCategories = filteredData.slice(4);
  const otherTotal = otherCategories.reduce(
    (acc: number, item: itemTypes) => acc + item.categorySum,
    0,
  );

  const displayData =
    showAll || filteredData.length <= 5
      ? filteredData
      : [
          ...topCategories,
          {
            spendCategoryId: 'other',
            name: '그 외 카테고리',
            categorySum: otherTotal,
            color: '#cccccc',
          },
        ];

  const chartData = {
    labels: ['비율'],
    datasets: displayData.map((data: itemTypes, index: number) => ({
      label: data.name,
      data:
        totalExpenditure > 0
          ? [(data.categorySum / totalExpenditure) * 100]
          : [0],
      backgroundColor: data.color,
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
            총{' '}
            {totalExpenditure
              ? totalExpenditure.toLocaleString()
              : '데이터 없음'}
            원을
            <br />
            소비했어요.
          </Typography>
          <Bar data={chartData} options={options} height={'50%'} />
          <div>
            {displayData.map((item: itemTypes) => {
              const percentage =
                totalExpenditure > 0
                  ? ((item.categorySum / totalExpenditure) * 100).toFixed(2)
                  : 0;
              return (
                <section key={item.spendCategoryId} css={itemsCss}>
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
                    {item.categorySum
                      ? item.categorySum.toLocaleString()
                      : '데이터 없음'}
                    원
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
          <Analysis period={period} offset={offset} curSum={totalExpenditure} />
        </>
      ) : (
        <Preview content="가계부가" button="가계부" url="account" />
      )}
    </div>
  );
};

export default SpendChart;
