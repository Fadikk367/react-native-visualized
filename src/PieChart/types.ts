import type { ChartBaseProps } from '../types';

export interface PieChartPiece {
  label: string;
  value: number;
  color: string;
}

export interface PieChartProps extends ChartBaseProps {
  data: PieChartPiece[];
  startAngle?: number;
  cutoutRadius?: number;
}
