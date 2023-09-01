import type { BaseLineChartProps } from '../core/BaseLineChart/types';

export interface LineData {
  label: string;
  points: { x: number; y: number }[];
  color: string;
  strokeWidth?: number;
}

export interface LineChartProps
  extends Omit<BaseLineChartProps<LineData>, 'renderPath'> {}
