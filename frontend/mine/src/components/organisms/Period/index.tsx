/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Calendar, Icon, Typography } from 'oyc-ds';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PeriodProps {
  from: Date;
  to?: Date;
}

const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const dateCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

type SelectType = 'start' | 'end' | null;

const Period = ({ from, to = new Date() }: PeriodProps) => {
  const [selected, setSelected] = useState<SelectType>(null);

  const handleClick = (select: SelectType) => {
    if (selected === select) {
      setSelected(null);
      return;
    }
    setSelected(select);
  };

  console.log(selected);

  return (
    <>
      <div css={containerCss}>
        <div css={dateCss}>
          <Typography color="dark" size="md" weight="medium">
            시작일
          </Typography>
          <Typography
            color="secondary"
            size="md"
            weight="medium"
            onClick={() => handleClick('start')}
          >
            2024. 07. 01 (금)
          </Typography>
        </div>
        <div>
          <Icon size="sm" color="dark">
            <ArrowRightIcon />
          </Icon>
        </div>
        <div css={dateCss}>
          <Typography color="dark" size="md" weight="medium">
            종료일
          </Typography>
          <Typography
            color="secondary"
            size="md"
            weight="medium"
            onClick={() => handleClick('end')}
          >
            2024. 07. 11 (금)
          </Typography>
        </div>
      </div>
      {selected && <Calendar />}
    </>
  );
};

export default Period;
