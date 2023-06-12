import AreaChart from './AreaChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ProgressRing from './ProgressRing';
import RadarChart from './RadarChart';
import Scatter from './Scatter';
import * as coreUtils from './core/utils';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b * 4);
}

export const Chart = {
  LineChart,
  AreaChart,
  Bar: BarChart,
  Scatter,
  Pie: PieChart,
  ProgressRing,
  Radar: RadarChart,
};

export const utils = coreUtils;
