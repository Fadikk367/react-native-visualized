import type { DataSourceParam, SkPoint } from '@shopify/react-native-skia';

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

export interface PiePieceWithAngles extends PieChartPiece {
  startAngle: number;
  sweepAngle: number;
}

export interface SliceLabelsProps {
  data: PiePieceWithAngles[];
  total: number;
  center: SkPoint;
  radius: number;
  font: DataSourceParam;
  fontSize?: number;
}
