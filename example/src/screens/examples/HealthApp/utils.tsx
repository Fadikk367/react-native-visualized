import type { BarData, PointData, RingData } from './types';

export const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const generateHeartRate = (): PointData[] => {
  return Array.from({ length: 24 }).map((_, i) => ({
    x: i + 1,
    y: getRandom(80, 40, 0.7),
  }));
};

export const generateActivityData = (): RingData[] => {
  const calories = getRandom(2000, 200);
  const steps = getRandom(6000, 2000);
  const activityTime = getRandom(40, 20);

  return [
    {
      color: '#31df33',
      label: 'Steps',
      value: steps,
      full: 8000,
      extras: {
        full: 8000,
        value: steps,
      },
    },
    {
      color: '#4b8aff',
      label: 'Time',
      value: activityTime,
      full: 60,
      extras: {
        full: 60,
        value: activityTime,
      },
    },
    {
      color: '#fc5757',
      label: 'Calories',
      value: calories,
      full: 2300,
      extras: {
        full: 2300,
        value: calories,
      },
    },
  ];
};

export const generateSleepData = (): BarData[] => {
  return WEEK_DAYS.map(day => ({
    label: day,
    value: getRandom(8, 2),
  }));
};

const getRandom = (base: number, spread: number, growingThreshold = 0.5) => {
  const sign = Math.random() < growingThreshold ? 1 : -1;
  return base + sign * Math.random() * spread;
};
