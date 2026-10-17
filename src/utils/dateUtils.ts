export interface WeekInfo {
  weekId: string;
  startDate: Date;
  endDate: Date;
  formattedRange: string;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getSunday(monday: Date): Date {
  const d = new Date(monday);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function getISOWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export function getWeekInfo(date: Date = new Date()): WeekInfo {
  const monday = getMonday(date);
  const sunday = getSunday(monday);

  const startDay = monday.getDate();
  const startMonth = MONTH_NAMES[monday.getMonth()];
  const startYear = monday.getFullYear();

  const endDay = sunday.getDate();
  const endMonth = MONTH_NAMES[sunday.getMonth()];
  const endYear = sunday.getFullYear();

  let formattedRange = '';
  if (startYear === endYear) {
    if (startMonth === endMonth) {
      formattedRange = `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
    } else {
      formattedRange = `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
    }
  } else {
    formattedRange = `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
  }

  const weekNum = getISOWeekNumber(monday);
  const padWeek = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;
  const weekId = `${monday.getFullYear()}-W${padWeek}`;

  return {
    weekId,
    startDate: monday,
    endDate: sunday,
    formattedRange,
  };
}

export function shiftWeek(currentMonday: Date, weeks: number): Date {
  const d = new Date(currentMonday);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

export function formatCompletedAt(isoString?: string): string {
  if (!isoString) return '';
  const d = new Date(isoString);
  const dayName = DAY_NAMES[d.getDay()];
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()];
  return `${dayName}, ${day} ${month}`;
}
