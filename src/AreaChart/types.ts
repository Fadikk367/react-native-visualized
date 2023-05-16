import type { BaseLineChartProps } from '../core/BaseLineChart/types';

export interface AreaData {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  opacity?: number;
}

export interface AreaChartProps
  extends Omit<BaseLineChartProps<AreaData>, 'renderPath'> {
  stacked?: boolean;
  normalized?: boolean;
  data: AreaData[];
}
