import type { HealthData } from './types';
import {
  generateActivityData,
  generateHeartRate,
  generateSleepData,
} from './utils';

const healthDataCache = new Map<string, HealthData>();

export const useHealthData = (date: Date): HealthData => {
  const dateKey = date.toLocaleDateString();
  const cachedData = healthDataCache.get(dateKey);
  if (cachedData) return cachedData;

  const generatedData = {
    heartRate: generateHeartRate(),
    activity: generateActivityData(),
    sleep: generateSleepData(),
  };

  healthDataCache.set(dateKey, generatedData);

  return generatedData;
};
