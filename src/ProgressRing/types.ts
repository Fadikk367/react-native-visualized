import type { ChartBaseProps } from '../types';

export interface RingData {
  color: string;
  value: number;
  full: number;
  start?: number;
}

export interface ProgressRingProps extends ChartBaseProps {
  data: RingData[];
  ringsSpacing?: number;
  startAngle?: number;
  ringWidth?: number;
}
