/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { apiFormatDate } from '../../utils/dateUtils';
import useModal from '../../hooks/useModal';
import Modal from '../../hooks/useModal/Modal';
import { getAccounts } from '../../apis/accountApi';
import AccountList from '../../components/molecules/AccountList';

interface AccountListFetchProps {
  start: Date;
  end: Date;
}

const containerCss = css`
  overflow-x: hidden;

  > div {
    padding: 1rem;
  }
`;

const AccountListFetch = ({ start, end }: AccountListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['account', start.toLocaleDateString(), end.toLocaleDateString()],
    queryFn: () => getAccounts(apiFormatDate(start), apiFormatDate(end)),
  });

  if (error && !isFetching) {
    throw error;
  }

  const { open, modal } = useModal();

  return (
    <>
      <Modal data={modal} />
      <div css={containerCss}>
        {data.data.map((data, index) => (
          <AccountList
            key={data.accountId}
            data={data}
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
