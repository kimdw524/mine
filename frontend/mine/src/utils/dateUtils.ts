export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}${month}${day}`;
};

export const apiFormatDate = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export const simpleFormatDate = (date: Date): string => {
  return `${date.getFullYear().toString().slice(-2)}. ${date.getMonth() + 1}. ${date.getDate()}. ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getWeekDates = (dateString: string): string[] => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - dayOfWeek);

  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(
      `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
    );
  }

  return weekDates;
};

export const getMonthDates = (dateString: string): string[] => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();

  const lastDayOfMonth = new Date(year, month + 1, 0);

  const monthDates: string[] = [];

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const currentDate = new Date(year, month, day);
    monthDates.push(
      `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
    );
  }

  return monthDates;
};

export const getBetweenDates = (start: Date, end: Date): string[] => {
  const dates: string[] = [];
  let diff = end.getTime() - start.getTime();

  while (diff >= 0) {
    const date = new Date(end.getTime() - diff);
    diff -= 1000 * 3600 * 24;
    dates.push(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    );
  }

  return dates;
};
