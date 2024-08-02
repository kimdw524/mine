/** @jsxImportSource @emotion/react */
import { Typography } from 'oyc-ds';
import React from 'react';
import { AccountData } from '../../../apis/accountApi';
import { accountCategoryData } from '../../../utils/accountUtils';
import { simpleFormatDate } from '../../../utils/dateUtils';
import CategoryIcon from '../../atoms/CategoryIcon';
import {
  bodyCss,
  containerCss,
  detailCss,
  digitCss,
  iconWrapperCss,
  operatorCss,
} from './style';

interface AccountListProps extends React.ComponentProps<'div'> {
  data: AccountData;
}

const AccountList = ({ data, ...props }: AccountListProps) => {
  return (
    <div css={containerCss} {...props}>
      <div css={iconWrapperCss}>
        <CategoryIcon
          color={accountCategoryData[data.spendCategoryId ?? 99].color}
        >
          {accountCategoryData[data.spendCategoryId ?? 99].icon}
        </CategoryIcon>
      </div>
      <div css={bodyCss}>
        <Typography size="md" color="dark">
          {data.title}
        </Typography>
        <Typography color="secondary" size="sm" weight="medium" css={detailCss}>
          {
            accountCategoryData[
              data.accountType === 'I' ? 99 : data.spendCategoryId
            ].name
          }
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
