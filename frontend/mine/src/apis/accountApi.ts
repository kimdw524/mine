import { api } from './interceptors';

export interface AccountData {
  accountId: number;
  spendCategoryId: number;
  accountType: 'I' | 'S';
  money: number;
  title: string;
  description: string;
  dateTime: string;
}

export type AccountParam = Omit<AccountData, 'accountId'>;

export const getAccounts = (startDate: string, endDate: string) => {
  return api.get<AccountData[]>(
    `/api/users/accounts?startDate=${startDate}&endDate=${endDate}`,
  );
};

export const addAccount = (param: AccountParam) => {
  return api.post('/api/users/accounts/calendar', param);
};

export const addAccountByChat = (param: { query: string }) => {
  return api.post<AccountData>('/api/users/accounts/chat', param);
};

export const updateAccount = (param: AccountData) => {
  return api.patch('/api/users/account', param);
};

export const searchAccounts = (query: string) => {
  return api.get<AccountData[]>(`/api/users/accounts/calendar?query=${query}`);
};

export const searchAccountsByChat = (query: string) => {
  return api.get<AccountData[]>(`/api/users/accounts/chat?query=${query}`);
};

export const deleteAccount = (accountId: number) => {
  return api.delete(`/api/users/accounts/${accountId}`);
};
