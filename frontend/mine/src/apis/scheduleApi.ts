import axios from 'axios';

export interface ScheduleData {
  scheduleId: number;
  categoryId: number;
  startDateTime: string;
  endDateTime: string;
  title: string;
  description: string;
  where: string;
}

export const getDailySchedules = (date: string) => {
  return axios.get<ScheduleData[]>(`/schedule/daily/${date}`);
};
