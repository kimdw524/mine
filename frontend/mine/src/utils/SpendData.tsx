import { apiFormatDate } from "./dateUtils";

export interface Spend {
  spendCategoryId?: number;
  categorySum?: number;
  name?: string;
  color?: string;
}

export interface DisplayData extends Spend {
  name: string;
  color: string;
}

export interface Timeframe {
  startDate: string;
  endDate: string;
  title: string;
}

export const getDisplayTimeframe = (period: string, offset: number): Timeframe => {
  const today = new Date();
  let startDate: string;
  let endDate: string;
  let title: string;

  startDate = '';
  endDate = '';
  title = '';

  if (period === 'weekly') {
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7 * offset);
    const previousWeekEnd = new Date(previousWeekStart);
    previousWeekEnd.setDate(previousWeekStart.getDate() + 6);
    startDate = apiFormatDate(previousWeekStart);
    endDate = apiFormatDate(previousWeekEnd);
    title = `${previousWeekStart.getFullYear()}. ${previousWeekStart.getMonth() + 1}. ${previousWeekStart.getDate()} ~ ${previousWeekEnd.getFullYear()}. ${previousWeekEnd.getMonth() + 1}. ${previousWeekEnd.getDate()}.`;
  } else if (period === 'monthly') {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const adjustedDate = new Date(currentYear, currentMonth - offset, 1);
    startDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 1));
    endDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0));
    title = `${adjustedDate.getFullYear()}. ${adjustedDate.getMonth() + 1}`;
  } else if (period === 'yearly') {
    const currentYear = today.getFullYear();
    const adjustedYear = currentYear - offset;
    startDate = `${adjustedYear}-01-01`;
    endDate = `${adjustedYear}-12-31`;
    title = `${adjustedYear}`;
  }

  return { startDate, endDate, title };
};


// 날짜 범위를 계산하여 API 요청 형식으로 변환
export const calculateDateRange = (period: string, offset: number) => {
  const today = new Date();
  let startDate: string;
  let endDate: string;

  startDate = '';
  endDate = '';

  if (period === 'weekly') {
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay());
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7 * offset);
    const previousWeekEnd = new Date(previousWeekStart);
    previousWeekEnd.setDate(previousWeekStart.getDate() + 6);
    startDate = apiFormatDate(previousWeekStart);
    endDate = apiFormatDate(previousWeekEnd);
  } else if (period === 'monthly') {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const adjustedDate = new Date(currentYear, currentMonth - offset, 1);
    startDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth(), 1));
    endDate = apiFormatDate(new Date(adjustedDate.getFullYear(), adjustedDate.getMonth() + 1, 0));
  } else if (period === 'yearly') {
    const currentYear = today.getFullYear();
    const adjustedYear = currentYear - offset;
    startDate = `${adjustedYear}-01-01`;
    endDate = `${adjustedYear}-12-31`;
  }

  // 변수가 초기화되지 않은 경우 기본값을 설정
  if (!startDate || !endDate) {
    throw new Error('날짜 범위가 확인이 되지 않음');
  }

  return { startDate, endDate };
};