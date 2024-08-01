import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Expense = {
  id: number;
  category: string;
  amount: number;
  color: string;
  date: string; // 날짜 필드 추가
};

const expenses: Expense[] = [
  { id: 1, category: '식비', amount: 100000, color: 'rgba(153, 102, 255, 0.5)', date: '2024-07-28' },
  { id: 2, category: '교통비', amount: 20000, color: 'rgba(255, 159, 64, 0.5)', date: '2024-07-29' },
  { id: 3, category: '유틸리티', amount: 20000, color: 'rgba(75, 192, 192, 0.5)', date: '2024-08-1' },
  { id: 4, category: '오락비', amount: 10000, color: 'rgba(255, 99, 132, 0.5)', date: '2024-08-01' },
  // 추가 데이터 예시
];

const Chart = () => {
  const [period, setPeriod] = useState('monthly'); // 선택된 기간 상태 관리
  const [offset, setOffset] = useState(0); // 이전 주 또는 달 선택을 위한 오프셋 상태

  const filterExpenses = () => {
    const today = new Date();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (period === 'monthly') {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth() - offset, 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() - offset + 1, 0);
        return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
      } else if (period === 'weekly') {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (today.getDay() + 7 * offset)); // 이전 주 계산

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - (today.getDay() + 7 * offset) + 6); // 현재 주의 마지막 날

        return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
      } else if (period === 'yearly') {
        const startOfYear = new Date(today.getFullYear() - offset, 0, 1); // 연도 시작일
        const endOfYear = new Date(today.getFullYear() - offset, 11, 31); // 연도 종료일
        return expenseDate >= startOfYear && expenseDate <= endOfYear;
      }
      return false;
    });
    return filteredExpenses;
  };

  const filteredExpenses = filterExpenses();
  const totalAmount = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  
  

  const data = {
    labels: ['소비 비율'],
    datasets: filteredExpenses.map((expense, index) => ({
      label: expense.category,
      data: totalAmount > 0 ? [(expense.amount / totalAmount) * 100] : [0],
      backgroundColor: expense.color,
      borderSkipped: false,
      borderRadius: {
        topLeft: index === 0 ? 15 : 0,
        bottomLeft: index === 0 ? 15 : 0,
        topRight: index === filteredExpenses.length - 1 ? 15 : 0,
        bottomRight: index === filteredExpenses.length - 1 ? 15 : 0,
      },
      stack: 'stack1',
    })),
  };

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const getDisplayTimeframe = (): JSX.Element => {
    const today = new Date();
    let displayText: JSX.Element = <div></div>; // 기본값으로 빈 div 요소를 할당

    if (period === 'monthly') {
        const currentMonth = today.getMonth();

        const monthNames = [
            '1월', '2월', '3월', '4월', '5월', '6월', 
            '7월', '8월', '9월', '10월', '11월', '12월'
        ];

        displayText = (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>{monthNames[currentMonth - offset]}</span>
            </div>
        );
    } else if (period === 'weekly') {
      const currentWeekStart = new Date(today);
      currentWeekStart.setDate(today.getDate() - today.getDay()); // 현재 주의 시작일 (일요일)
      
      const previousWeekStart = new Date(currentWeekStart);
      previousWeekStart.setDate(previousWeekStart.getDate() - 7 * offset); // 이전 주의 시작일
  
      const nextWeekStart = new Date(currentWeekStart);
      nextWeekStart.setDate(nextWeekStart.getDate() + 7 * (offset + 1)); // 다음 주의 시작일
  
      const formatDate = (date: Date) => date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
      
      // 주의 끝일 계산
      const currentWeekEnd = new Date(currentWeekStart);
      currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // 현재 주의 끝일 (토요일)
  
      const previousWeekEnd = new Date(previousWeekStart);
      previousWeekEnd.setDate(previousWeekStart.getDate() + 6); // 이전 주의 끝일
  
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 6); // 다음 주의 끝일
  
      displayText = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>
                  {formatDate(previousWeekStart)}~{formatDate(previousWeekEnd)} {/* 이전 주 */}
              </span>
          </div>
      );
    } else if (period === 'yearly') {
        const currentYear = today.getFullYear();
        displayText = (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>{currentYear - offset}년</span>
            </div>
        );
    }

    return displayText;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid black' }}>
      <h2>총 {totalAmount.toLocaleString()}원을 소비했어요</h2>
      <div>
        <button onClick={() => { setPeriod('monthly'); setOffset(0); }}>월별</button>
        <button onClick={() => { setPeriod('weekly'); setOffset(0); }}>주별</button>
        <button onClick={() => { setPeriod('yearly'); setOffset(0); }}>연별</button> {/* 연도별 버튼 추가 */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={() => setOffset(offset + 1)} style={{ marginRight: '10px' }}>⏮️</button>
        {getDisplayTimeframe()}
        <button onClick={() => setOffset(offset - 1)} style={{ marginLeft: '10px' }}>⏭️</button>
      </div>
      <Bar data={data} options={options} height={"30%"} />
      <div style={{ marginTop: '20px' }}>
        {filteredExpenses.map((expense) => {
          const percentage = totalAmount > 0 ? ((expense.amount / totalAmount) * 100).toFixed(2) : 0;
          return (
            <div key={expense.id} style={{ margin: '5px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div style={{ width: '10px', height: '40px', backgroundColor: expense.color, marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <span>{expense.category}</span>
                  <div style={{ color: 'gray', fontSize: '12px' }}>{percentage}%</div>
                </div>
                <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{expense.amount.toLocaleString()}원</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
