import type { ChartBaseProps } from '../types';

export interface LineChartProps extends ChartBaseProps {
  data: { x: number; y: number }[];
  yDomain: [number, number];
  xDomain: [number, number];
}
