import BarChart from './BarChart';
import LineChart from './LineChart';
import Line from './LineChart/Line';
import * as coreUtils from './core/utils';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b * 4);
}

export const Chart = {
  Line,
  LineChart,
  Bar: BarChart,
};

export const utils = coreUtils;
