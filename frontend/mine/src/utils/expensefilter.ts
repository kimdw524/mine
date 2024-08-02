import { Spend } from "./SpendData";

export const filterExpenses = (expenses: Spend[], period: string, offset: number): Spend[] => {
  const today = new Date();
  return expenses.filter((expense) => {
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
};
