import axios from 'axios';

export interface AccountData {
  accountId: number;
  spendCategoryId: number;
  accountType: 'I' | 'S';
  money: number;
  title: string;
  description: string;
  dateTime: string;
}

export const getAccounts = (startDate: string, endDate: string) => {
  return axios.get<AccountData[]>(
    `/api/users/accounts?startDate=${startDate}&endDate=${endDate}`,
  );
};
