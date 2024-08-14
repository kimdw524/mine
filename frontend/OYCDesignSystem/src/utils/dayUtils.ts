export type DayType = 'weekday' | 'satuarday' | 'holiday' | 'light';

export interface DateData {
  year: number;
  month: number;
  day: number;
  type: DayType;
}

export const getLastMonth = (year: number, month: number): DateData => {
  if (month === 1) {
    year--;
    month = 12;
  } else {
    month--;
  }
  return { year, month, day: 1, type: 'weekday' };
};

export const getNextMonth = (year: number, month: number): DateData => {
  if (month === 12) {
    year++;
    month = 1;
  } else {
    month++;
  }
  return { year, month, day: 1, type: 'weekday' };
};

export const getDays = (year: number, month: number): DateData[][] => {
  const days: DateData[][] = [];
  const lastMonthEnd = new Date(year, month - 1, 0);
  const { year: lastYear, month: lastMonth } = getLastMonth(year, month);
  const { year: nextYear, month: nextMonth } = getNextMonth(year, month);
  const currentMonthEnd = new Date(year, month, 0);

  let day = 1;

  if (lastMonthEnd.getDay() < 6) {
    days.push([]);

    for (
      let i = lastMonthEnd.getDate() - lastMonthEnd.getDay();
      i <= lastMonthEnd.getDate();
      i++
    ) {
      days[0].push({ year: lastYear, month: lastMonth, day: i, type: 'light' });
    }

    for (; day <= 6 - lastMonthEnd.getDay(); day++) {
      days[0].push({
        year,
        month,
        day,
        type:
          days[0].length === 0
            ? 'holiday'
            : days[0].length === 6
              ? 'satuarday'
              : 'weekday',
      });
    }
  }

  for (; day <= currentMonthEnd.getDate(); day++) {
    if (days.length === 0 || days.at(-1)!.length >= 7) {
      days.push([]);
    }

    days.at(-1)?.push({
      year,
      month,
      day,
      type:
        days.at(-1)!.length === 0
          ? 'holiday'
          : days.at(-1)!.length === 6
            ? 'satuarday'
            : 'weekday',
    });
  }

  let nextDay = 0;
  while (days.at(-1)!.length < 7) {
    days.at(-1)!.push({
      year: nextYear,
      month: nextMonth,
      day: ++nextDay,
      type: 'light',
    });
  }

  return days;
};
