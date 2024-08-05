/** @jsxImportSource @emotion/react */
import React, { Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../../../components/organisms/AppBar';
import { containerCss, modalCss, resultCss, searchCss } from './style';
import TypeTextField from '../../../components/molecules/TypeTextField';
import { Typography } from 'oyc-ds';
import { ErrorBoundary } from 'react-error-boundary';
import SearchListFetch from './SearchListFetch';
import Loading from '../../../components/common/Loading';

export type AccountSearchType = 'keyword' | 'ai';

interface SearchData {
  query: string;
  type: AccountSearchType;
}

const types: { name: string; value: AccountSearchType }[] = [
  { name: '키워드 검색', value: 'keyword' },
  { name: 'AI 검색', value: 'ai' },
];

const tips: Record<AccountSearchType, string> = {
  ai: '궁금한 내용을 AI에게 질문하세요.',
  keyword: '가계부의 제목, 내용 등 검색할 키워드를 입력하세요.',
};

const Search = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<AccountSearchType>('keyword');
  const [search, setSearch] = useState<SearchData>({ query: '', type: type });
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (!queryRef.current || e.key !== 'Enter') {
      return;
    }
    setSearch({ query: queryRef.current.value, type });
  };

  return (
    <div css={modalCss}>
      <div css={containerCss}>
        <div>
          <AppBar label="가계부 검색" onBackClick={() => navigate(-1)} />
        </div>
        <div>
          <div css={searchCss}>
            <TypeTextField
              types={types}
              ref={queryRef}
              onKeyDown={handleSubmit}
              onTypeChange={(type) => setType(type as AccountSearchType)}
            />
            <Typography color="secondary" size="xs" weight="medium">
              {tips[type]}
            </Typography>
          </div>
        </div>
        <div css={resultCss}>
          {search.query && (
            <ErrorBoundary fallback={<>error</>}>
              <Suspense fallback={<Loading />}>
                <SearchListFetch query={search.query} type={search.type} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
