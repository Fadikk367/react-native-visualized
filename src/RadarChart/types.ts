import type { ChartBaseProps } from '../types';

export interface RadarChartProps<T extends string> extends ChartBaseProps {
  data: (Record<T, number> & { color: string })[];
  domain: [number, number];
  variables: T[];
}
