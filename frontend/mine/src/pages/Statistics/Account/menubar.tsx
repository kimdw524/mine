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

const MenuBar = () => {
  const [period, setPeriod] = useState('weekly');
  const [offset, setOffset] = useState(0);
  const [dataType, setDataType] = useState('spend');
  const { title } = getDisplayTimeframe(period, offset);
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


  return (
    <>
      <AppBar
        label="가계 통계"
        onBackClick={() => nav('/', { state: { step: 2 } })}
      />
      <div css={containerCss}>
        <MenuTab
          color="primary"
          size="sm"
          variant="outlined"
          border={0}
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
          variant="contained"
          border={0.25}
          onChangeMenu={handleDataTypeChange}
          css={typeCss}
        >
          <div style={{fontSize:"15px"}}>지출</div>
          <div style={{fontSize:"15px"}}>수입</div>
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

export default MenuBar;
