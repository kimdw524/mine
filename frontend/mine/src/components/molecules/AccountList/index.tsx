/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { Typography } from 'oyc-ds';
import {
  bodyCss,
  containerCss,
  detailCss,
  digitCss,
  iconWrapperCss,
  operatorCss,
} from './style';
import { accountCategoryData } from '../../../utils/accountUtils';
import { simpleFormatDate } from '../../../utils/dateUtils';
import { AccountData } from '../../../apis/accountApi';

interface AccountListProps extends React.ComponentProps<'div'> {
  data: AccountData;
}
/*

        <Typography color="secondary" size="xs" weight="light">
          {simpleFormatDate(new Date(data.dateTime))}
        </Typography>
*/

const AccountList = ({ data, ...props }: AccountListProps) => {
  return (
    <div css={containerCss} {...props}>
      <div
        css={iconWrapperCss}
        style={
          {
            '--color': accountCategoryData[data.spendCategoryId ?? 99].color,
          } as CSSProperties
        }
      >
        {accountCategoryData[data.spendCategoryId ?? 99].icon}
      </div>
      <div css={bodyCss}>
        <Typography size="md" color="dark">
          {data.title}
        </Typography>
        <Typography color="secondary" size="sm" weight="medium" css={detailCss}>
          {accountCategoryData[data.spendCategoryId ?? 99].name}
        </Typography>
      </div>
      <div css={digitCss}>
        <Typography
          size="md"
          color={data.accountType === 'I' ? 'primary' : 'dark'}
        >
          <span css={operatorCss}>{data.accountType === 'I' ? '+' : '-'}</span>
          {data.money.toLocaleString()}
        </Typography>
        <Typography color="secondary" size="xs" weight="medium">
          {simpleFormatDate(new Date(data.dateTime))}
        </Typography>
      </div>
    </div>
  );
};

export default AccountList;
