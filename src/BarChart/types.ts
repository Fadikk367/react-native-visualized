import type { ChartBaseProps } from '../types';

export interface BarData {
  value: number;
  label: string;
}

export interface BarChartProps extends ChartBaseProps {
  data: BarData[];
  yDomain: [number, number];
  barRatio?: number;
}

export interface BarProps {
  value: number;
  space: number;
  ratio: number;
  padding: number;
  mapDomainToCanvas(v: number): number;
}

export interface BarLabelProps {
  label: string;
  space: number;
  height: number;
}
