import type { ChartBaseProps } from '../types';

export interface LineChartProps extends ChartBaseProps {
  data: { x: number; y: number }[];
}
