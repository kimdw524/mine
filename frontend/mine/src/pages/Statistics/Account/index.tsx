/** @jsxImportSource @emotion/react */
import React, { useState, startTransition } from 'react';
import { containerCss, typeCss } from './style';
import DataTab from '../Preview/datetab';
import { Typography, MenuTab } from 'oyc-ds';
import AppBar from '../../../components/organisms/AppBar';
import SpendChart from './Spend/spend';
import Incomes from './Income/income';
import { getDisplayTimeframe } from '../../../utils/SpendData';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Preview from '../Preview';
import Analysis from './Spend/analysis';

const AccountChart = () => {
  const [period, setPeriod] = useState('weekly');
  const [offset, setOffset] = useState(0);
  const [dataType, setDataType] = useState('spend');
  const nav = useNavigate();

  const handleMenuChange = (menu: number) => {
    startTransition(() => {
      switch (menu) {
        case 0:
          setPeriod('weekly');
          setOffset(0);
          break;
        case 1:
          setPeriod('monthly');
          setOffset(0);
          break;
        case 2:
          setPeriod('yearly');
          setOffset(0);
          break;
        default:
          break;
      }
    });
  };

  const handleDataTypeChange = (menu: number) => {
    startTransition(() => {
      switch (menu) {
        case 0:
          setDataType('spend');
          break;
        case 1:
          setDataType('income');
          break;
        default:
          break;
      }
    });
  };

  const { title } = getDisplayTimeframe(period, offset);

  return (
    <>
      <AppBar label="가계 통계" onBackClick={() => nav('/')} />
      <div css={containerCss}>
        <MenuTab
          color="light"
          size="sm"
          variant="rounded"
          onChangeMenu={handleMenuChange}
        >
          <div>주별</div>
          <div>월별</div>
          <div>연별</div>
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
        <MenuTab
          color="primary"
          size="sm"
          variant="rounded"
          onChangeMenu={handleDataTypeChange}
          css={typeCss}
        >
          <div>지출</div>
          <div>수입</div>
        </MenuTab>
        <ErrorBoundary fallback={<div>에러 발생</div>}>
          <Suspense fallback={<div>로딩중...</div>}>
            {dataType === 'spend' ? (
              <SpendChart period={period} offset={offset} />
            ) : (
              <Incomes period={period} offset={offset} />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default AccountChart;
