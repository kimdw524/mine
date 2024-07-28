import axios from 'axios';

export interface ScheduleData {
  scheduleId: number;
  title: string;
  description: string;
  place: string;
  startTime: string;
  category: number;
}

export const getDailySchedules = (date: string) => {
  return axios.get<ScheduleData[]>(`/schedule/daily/${date}`);
};
