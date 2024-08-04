/** @jsxImportSource @emotion/react */
import React, { CSSProperties } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AccountSearchType } from '.';
import { searchAccounts, searchAccountsByChat } from '../../../apis/accountApi';
import useModal from '../../../hooks/useModal';
import Modal from '../../../hooks/useModal/Modal';
import AccountList from '../../../components/molecules/AccountList';
import Edit from '../Edit';
import { css } from '@emotion/react';

interface SearchListFetchProps {
  query: string;
  type: AccountSearchType;
}

const containerCss = css`
  overflow-x: hidden;
  margin-top: 1rem;

  > div {
    padding: 1rem;
  }
`;

const SearchListFetch = ({ query, type }: SearchListFetchProps) => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [
      'account',
      type === 'keyword' ? 'search' : 'searchByChat',
      query,
    ],
    queryFn: () =>
      type === 'keyword' ? searchAccounts(query) : searchAccountsByChat(query),
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
            onClick={() =>
              open({
                component: <Edit data={data} />,
                name: 'editAccountBySearch',
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

export default SearchListFetch;
