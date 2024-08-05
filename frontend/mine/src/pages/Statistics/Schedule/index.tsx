/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { MenuTab, Typography } from 'oyc-ds';
import DataTab from '../datatab';
import { containerCss } from './style';
import { getDisplayTimeframe } from '../../../utils/SpendData';
import Schedule from './schedule';

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
        <Schedule period={period} offset={offset}/>
      </div>
    </>
  );
};

export default ScheduleChart;