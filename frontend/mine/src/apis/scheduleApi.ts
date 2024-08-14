import { api } from './interceptors';

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

export const getSchedulesWithCategory = (
  startDate: string,
  endDate: string,
  categoryId: number,
) => {
  return api.get<ScheduleData[]>(
    `/api/users/schedules?startDate=${startDate}&endDate=${endDate}&categoryId=${categoryId}`,
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

export const searchSchedules = (query: string) => {
  return api.get<ScheduleData[]>(
    `/api/users/schedules/calendar?query=${query}`,
  );
};

export const searchSchedulesByChat = (query: string) => {
  return api.get<ScheduleData[]>(`/api/users/schedules/chat?query=${query}`);
};

export const deleteSchedule = (scheduleId: number) => {
  return api.delete(`/api/users/schedules/${scheduleId}`);
};

export const updateScheduleAchievement = () => {
  return api.patch<boolean>('/api/users/achievements/4');
};
