import type {
  DataSourceParam,
  SkPoint,
  SkRect,
} from '@shopify/react-native-skia';

import type { ChartBaseProps, ChartPadding } from '../types';

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

export type CalculatePieChartLayoutParams = {
  width: number;
  height: number;
  padding: ChartPadding;
  gap: number;
  legendWidth: number;
  legendPosition: 'left' | 'right';
};

export type PieChartLayout = {
  pie: {
    position: SkPoint;
    center: SkPoint;
    boundingSquare: SkRect;
    radius: number;
  };
  legend: {
    position: SkPoint;
  };
};

export type CalculatePieChartLayout = (
  params: CalculatePieChartLayoutParams,
) => PieChartLayout;
