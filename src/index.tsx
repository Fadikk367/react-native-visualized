import LineChart from './charts/LineChart';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b * 4);
}

export const Chart = {
  Line: LineChart,
};
