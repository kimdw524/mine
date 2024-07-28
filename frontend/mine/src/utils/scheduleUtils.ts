import colorPalette from 'oyc-ds/dist/themes/colorPalette';

export interface ScheduleCategory {
  id: number;
  name: string;
  color: string;
  fill: string;
}

export const scheduleCategoryData: Record<number, ScheduleCategory> = {
  1: { id: 1, name: '여행', color: '#fff', fill: colorPalette.blue[600] },
  2: { id: 2, name: '외식', color: '#fff', fill: colorPalette.red[600] },
  3: { id: 3, name: '업무', color: '#fff', fill: colorPalette.lightGreen[600] },
  4: { id: 4, name: '약속', color: '#fff', fill: colorPalette.yellow[900] },
  5: { id: 5, name: '기타', color: '#fff', fill: colorPalette.grey[900] },
};
