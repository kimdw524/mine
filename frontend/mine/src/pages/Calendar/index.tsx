/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  bodyCss,
  containerCss,
  modalCss,
  selectedCss,
  unselectedCss,
} from './style';
import Schedule from '../Schedule';
import AppBar from '../../components/organisms/AppBar';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Account from '../Account';
import useModal from '../../hooks/useModal';
import ScheduleSearch from '../Schedule/Search';
import AccountSearch from '../Account/Search';
import styles from './Calendar.module.css';
import TransitionAnimation from '../../components/common/TransitionAnimation';

type CalendarPage = 'schedule' | 'account';

interface CalendarProps {
  page?: CalendarPage;
}

const Calendar = ({ page: initialPage = 'schedule' }: CalendarProps) => {
  const navigate = useNavigate();
  const { push } = useModal();
  const [page, setPage] = useState<CalendarPage>(initialPage);

  const handleSearchClick = () => {
    push({
      component: page === 'schedule' ? <ScheduleSearch /> : <AccountSearch />,
      name: 'search',
    });
  };

  const Label = (
    <>
      <span
        css={page === 'schedule' ? selectedCss : unselectedCss}
        onClick={() => setPage('schedule')}
      >
        일정
      </span>
      <span
        css={page === 'account' ? selectedCss : unselectedCss}
        onClick={() => setPage('account')}
      >
        가계부
      </span>
    </>
  );

  return (
    <div css={modalCss}>
      <div css={containerCss}>
        <AppBar
          label={Label}
          menu={[
            { icon: <MagnifyingGlassIcon />, onClick: handleSearchClick },
            {
              icon: <XMarkIcon />,
              onClick: () => {
                navigate(-1);
              },
            },
          ]}
        />
        <div css={bodyCss}>
          <TransitionAnimation
            data-key={page}
            className={{
              normal: styles.fade,
              enter: styles['fade-enter'],
              exit: styles['fade-exit'],
            }}
          >
            <Schedule key={'schedule'} />
            <Account key={'account'} />
          </TransitionAnimation>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
