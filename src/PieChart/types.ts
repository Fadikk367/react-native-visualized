import type { SkPoint } from '@shopify/react-native-skia';

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
  spacing?: number;
}

export interface SliceSpacesProps {
  angles: number[];
  spacing: number;
  radius: number;
  center: SkPoint;
}
