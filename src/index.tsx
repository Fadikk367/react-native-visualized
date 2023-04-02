import BarChart from './BarChart';
import LineChart from './LineChart';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b * 4);
}

export const Chart = {
  Line: LineChart,
  Bar: BarChart,
};
