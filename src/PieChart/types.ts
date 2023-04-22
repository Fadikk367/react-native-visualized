import type {
  DataSourceParam,
  SkPoint,
  SkRect,
} from '@shopify/react-native-skia';

import type { ChartBaseProps, ChartPadding } from '../types';
import type { LegendConfig, LegendPosition } from './Legend/types';

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
  legend?: LegendConfig;
}

export interface SliceSpacesProps {
  angles: number[];
  spacing: number;
  radius: number;
  center: SkPoint;
  color: string;
}

export interface PieSliceProps extends PiePieceWithAngles {
  boundingSquare: SkRect;
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
  legend: {
    gap: number;
    width: number;
    position: LegendPosition;
  };
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

export interface PieChartPieceWithAngles extends PieChartPiece {
  startAngle: number;
  sweepAngle: number;
}

export type CalculateSlicesAngles = (
  data: PieChartPiece[],
  total: number,
  startAngle: number,
) => PieChartPieceWithAngles[];
