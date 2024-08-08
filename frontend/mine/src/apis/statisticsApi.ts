import { api } from './interceptors';
import axios from 'axios';

// 일정 - 기간 통계
export const scheduleInfo = (startDate:string, endDate:string) => {
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
export const spendInfo = (startDate:string, endDate:string) => {
  return api({
    url: `/api/users/statistics/account/spend?&startDate=${startDate}&endDate=${endDate}`,
    method: 'get',
    data:{
      startDate: startDate,
      endDate: endDate,
    }
  });
};

// export const spendInfo = async (startDate: string, endDate: string) => {
//   try {
//     const response = await axios.get('/api/spendinfo', {
//       params: { startDate, endDate }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('API 요청 실패:', error);
//     throw error;
//   }
// };

// 가계 수입 - 기간 통계
export const incomeInfo = (startDate:string, endDate:string) => {
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
