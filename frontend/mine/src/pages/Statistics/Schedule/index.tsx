/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { MenuTab, Typography } from 'oyc-ds';
import DataTab from '../Preview/datetab';
import { containerCss } from './style';
import { getDisplayTimeframe } from '../../../utils/SpendData';
import Schedule from './schedule';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Loading from '../../../components/molecules/Loading';

const ScheduleChart = () => {
  const [offset, setOffset] = useState(0);
  const [period, setPeriod] = useState('monthly');
  const nav = useNavigate();

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

  const { title } = getDisplayTimeframe(period, offset);

  return (
    <>
      <AppBar label="일정 통계" onBackClick={() => nav('/')} />
      <div css={containerCss}>
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
          title={<div>{title}</div>} 
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
        <ErrorBoundary fallback={<div>에러 발생</div>}>
          <Suspense fallback={<Loading/>}>
            <Schedule period={period} offset={offset} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default ScheduleChart;
