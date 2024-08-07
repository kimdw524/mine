/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { apiFormatDate } from '../../utils/dateUtils';
import useModal from '../../hooks/useModal';
import {
  getAccounts,
  getAccountsWithCategory,
  getIncomeAccounts,
  getSpendAccounts,
} from '../../apis/accountApi';
import AccountList from '../../components/molecules/AccountList';
import Edit from './Edit';

interface AccountListFetchProps {
  start: Date;
  end: Date;
  category: number;
}

const containerCss = css`
  overflow-x: hidden;

  > div {
    padding: 1rem;
  }
`;

const AccountListFetch = ({ start, end, category }: AccountListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [
      'account',
      category,
      start.toLocaleDateString(),
      end.toLocaleDateString(),
    ],
    queryFn: () =>
      category === 0
        ? getAccounts(apiFormatDate(start), apiFormatDate(end))
        : category === 99
          ? getIncomeAccounts(apiFormatDate(start), apiFormatDate(end))
          : category === 100
            ? getSpendAccounts(apiFormatDate(start), apiFormatDate(end))
            : getAccountsWithCategory(
                apiFormatDate(start),
                apiFormatDate(end),
                category,
              ),
  });

  if (error && !isFetching) {
    throw error;
  }

  const { push } = useModal();

  return (
    <>
      <div css={containerCss}>
        {data.data.map((data, index) => (
          <AccountList
            key={data.accountId}
            data={data}
            onClick={() =>
              push({
                component: <Edit data={data} />,
                name: 'editAccount',
              })
            }
            style={
              {
                '--duration': `${Math.min(800, index * 200 + 300)}ms`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default AccountListFetch;
