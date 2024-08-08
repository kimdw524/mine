/** @jsxImportSource @emotion/react */
import React from 'react';
import Preview from '../../Preview';
import { useSuspenseQuery } from '@tanstack/react-query';
import { incomeInfo } from '../../../../apis/statisticsApi';
import { calculateDateRange } from '../../../../utils/SpendData';
import { containerCss, incomeCss } from './income.style';
import { Typography } from 'oyc-ds';
import Analysis from '../analysis';

interface SpendChartProps {
  period: string;
  offset: number;
}

const Incomes: React.FC<SpendChartProps> = ({ period, offset }) => {
  const {startDate, endDate} = calculateDateRange(period, offset)
  const {data, error, isFetching} = useSuspenseQuery({
    queryKey: ['incomeinfo', period, offset],
    queryFn: async () => await incomeInfo(startDate, endDate)
  })

  if (error && !isFetching) {
    throw error;
  }


  return (
    <section css = {containerCss}>
      {data.data ? (
        <div>
          <Typography color="dark" size="lg" weight="bold" css={incomeCss}>
            총 {data.data} 원을
            <br />
            소비했어요.
          </Typography>
          <Analysis/>
        </div>
      ) : (
        <Preview content="가계부가" button="가계부" url="account" />
      )}
    </section>
  );
}
export default Incomes
