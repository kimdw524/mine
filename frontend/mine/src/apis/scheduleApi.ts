import { api } from '../api/interceptors';

export interface ScheduleData {
  scheduleId: number;
  categoryId: number;
  startDateTime: string;
  endDateTime: string;
  title: string;
  description: string;
  where: string;
}

export type ScheduleParam = Omit<ScheduleData, 'scheduleId'>;

export const getSchedules = (startDate: string, endDate: string) => {
  return api.get<ScheduleData[]>(
    `/api/users/schedules?startDate=${startDate}&endDate=${endDate}`,
  );
};

export const addSchedule = (param: ScheduleParam) => {
  return api.post('/api/users/schedules/calendar', param);
};

export const addScheduleByChat = (param: { query: string }) => {
  return api.post<ScheduleData>('/api/users/schedules/chat', param);
};

export const updateSchedule = (param: ScheduleData) => {
  return api.patch('/api/users/schedule', param);
};
