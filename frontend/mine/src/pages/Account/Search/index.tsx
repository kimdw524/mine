/** @jsxImportSource @emotion/react */
import React, { Suspense, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../../../components/organisms/AppBar';
import { containerCss, modalCss, searchCss } from './style';
import TypeTextField from '../../../components/molecules/TypeTextField';
import { Typography } from 'oyc-ds';
import { ErrorBoundary } from 'react-error-boundary';
import SearchListFetch from './SearchListFetch';

export type AccountSearchType = 'keyword' | 'ai';

const types: { name: string; value: AccountSearchType }[] = [
  { name: '키워드 검색', value: 'keyword' },
  { name: 'AI 검색', value: 'ai' },
];

const tips: Record<AccountSearchType, string> = {
  ai: '내가 궁금한 내용을 AI에게 질문하세요.',
  keyword: '일정의 제목, 내용 등 검색할 키워드를 입력하세요.',
};

const Search = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<AccountSearchType>('keyword');
  const [query, setQuery] = useState<string>('');
  const queryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (!queryRef.current || e.key !== 'Enter') {
      return;
    }
    setQuery(queryRef.current.value);
  };

  return (
    <div css={modalCss}>
      <AppBar label="가계 검색" onBackClick={() => navigate(-1)} />
      <div css={containerCss}>
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
        <ErrorBoundary fallback={<>error</>}>
          <Suspense fallback={<>loading...</>}>
            <SearchListFetch
              query={queryRef.current?.value || ''}
              type={type}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Search;
