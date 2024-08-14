/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import AppBar from '../../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { MenuTab, Typography } from 'oyc-ds';
import DataTab from '../Preview/datetab';
import { containerCss } from './style';
import { getDisplayTimeframe } from '../../../utils/SpendData';
import Schedule from './schedule';

const MenuBar = () => {
  const [offset, setOffset] = useState(0);
  const [period, setPeriod] = useState('monthly');
  const { title } = getDisplayTimeframe(period, offset);
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
      <AppBar
        label="일정 통계"
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
        <Schedule period={period} offset={offset} />
      </div>
    </>
  );
};

export default MenuBar;
