/** @jsxImportSource @emotion/react */
import React, { Suspense, useRef, useState } from 'react';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { Button, Calendar } from 'oyc-ds';
import Period, { PeriodSelected } from '../../components/molecules/Period';
import { getBetweenDates } from '../../utils/dateUtils';
import { ErrorBoundary } from 'react-error-boundary';
import AccountListFetch from './AccountListFetch';
import { accountCss, bottomCss, containerCss, periodCss } from './style';
import Create from './Create';
import useModal from '../../hooks/useModal';
import Modal from '../../hooks/useModal/Modal';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Search from './Search';

const Account = () => {
  const navigate = useNavigate();
  const periodSelectedRef = useRef<PeriodSelected>('start');
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [selected, setSelected] = useState<string[]>([
    `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
  ]);
  const { open, modal } = useModal();

  const [year, month] = start
    .toLocaleDateString()
    .replaceAll('.', '')
    .split(' ')
    .map((value) => parseInt(value));

  const handleCalendarClick = (year: number, month: number, day: number) => {
    const date = new Date(`${year}-${month}-${day}`);

    let newStart: Date = start,
      newEnd: Date = end;
    if (periodSelectedRef.current === 'start') {
      if (date.getTime() > end.getTime()) {
        newEnd = new Date(date);
        setEnd(newEnd);
      }
      setStart(date);
      setSelected(getBetweenDates(date, newEnd));
      return;
    }

    if (date.getTime() < start.getTime()) {
      newStart = new Date(date);
      setStart(newStart);
    }
    setEnd(date);
    setSelected(getBetweenDates(newStart, date));
  };

  const handleCreateAccount = () => {
    open({
      component: <Create />,
      name: 'createAccount',
    });
  };

  const handleSearchClick = () => {
    open({
      component: <Search />,
      name: 'searchAccount',
    });
  };

  return (
    <>
      <Modal data={modal} />
      <div css={containerCss}>
        <div>
          <AppBar
            label="가계부"
            onBackClick={() => navigate(-1)}
            menu={[
              { icon: <MagnifyingGlassIcon />, onClick: handleSearchClick },
            ]}
          />
        </div>
        <div>
          <Calendar
            year={year}
            month={month}
            selected={selected}
            onClick={handleCalendarClick}
          />
          <div css={periodCss}>
            <Period
              onClick={(selected) => (periodSelectedRef.current = selected)}
              start={start}
              end={end}
            />
          </div>
        </div>
        <div css={accountCss}>
          <ErrorBoundary fallback={<>error</>}>
            <Suspense fallback={<></>}>
              <AccountListFetch
                key={`${start.toLocaleDateString()}-${end.toLocaleDateString()}`}
                start={start}
                end={end}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div css={bottomCss}>
          <Button size="sm" onClick={handleCreateAccount}>
            추가
          </Button>
        </div>
      </div>
    </>
  );
};

export default Account;
