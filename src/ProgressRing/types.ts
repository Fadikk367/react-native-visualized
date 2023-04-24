import type { ChartBaseProps } from '../types';

export interface RingData {
  color: string;
  value: number;
  full: number;
}

export interface ProgressRingProps extends ChartBaseProps {
  data: RingData[];
}
