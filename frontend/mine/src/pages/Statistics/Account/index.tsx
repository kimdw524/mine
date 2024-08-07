/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { containerCss, typeCss } from './style';
import DataTab from '../Preview/datetab';
import { Typography, MenuTab } from 'oyc-ds';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import SpendChart from './spend';

import { getDisplayTimeframe } from '../../../utils/SpendData';
import Incomes from './income';

const AccountChart = () => {
  const [period, setPeriod] = useState('weekly'); // 선택된 기간 상태 관리
  const [offset, setOffset] = useState(0); // 이전 주 또는 달 선택을 위한 오프셋 상태
  const [dataType, setDataType] = useState('spend'); // 지출/수입 데이터 타입 상태
  const nav = useNavigate();

  const handleMenuChange = (menu: number) => {
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
  };

  const handleDataTypeChange = (menu: number) => {
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
  };

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
        {dataType === 'spend' ? (
          <SpendChart period={period} offset={offset} />
        ) : (
          <Incomes period={period} offset={offset} />
        )}
      </div>
    </>
  );
};

export default AccountChart;
