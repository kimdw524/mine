import { api } from './interceptors';

// 일정 - 기간 통계
export const scheduleChart = (startDate:string, endDate:string) => {
  return api({
    url: `/api/users/statistics/schedule?startDate=${startDate}&endDate=${endDate}`,
    method: 'get',
    data:{
      startDate: startDate,
      endDate: endDate,
    }
  });
};

// 가계 지출 - 기간 통계
export const spendChart = (startDate:string, endDate:string) => {
  return api({
    url: `/api/users/statistics/account/spend?&startDate=startDate=${startDate}&endDate=${endDate}`,
    method: 'get',
    data:{
      startDate: startDate,
      endDate: endDate,
    }
  });
};

// 가계 수입 - 기간 통계
export const incomeChart = (startDate:string, endDate:string) => {
  return api({
    url: `/api/users/statistics/account/income?&startDate=${startDate}&endDate=${endDate}`,
    method: 'get',
    data:{
      startDate: startDate,
      endDate: endDate,
    }
  });
};

// 가계 지출 - 통계 분석
export const spendMsg = () => {
  return api({
    url: '/api/users/statistics/account/spend/analysis',
    method: 'get',
    data:{}
  });
};

// 가계 수입 - 통계 분석
export const incomeMsg = () => {
  return api({
    url: '/api/users/statistics/account/income/analysis',
    method: 'get',
    data:{}
  });
};
