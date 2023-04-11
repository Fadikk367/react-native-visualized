import type { ChartBaseProps } from '../types';

export interface ScatterPoint {
  x: number;
  y: number;
  color?: string;
  size?: number;
}
export interface ScatterProps extends ChartBaseProps {
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
  data: ScatterPoint[];
}
