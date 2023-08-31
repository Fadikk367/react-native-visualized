import type {
  DataSourceParam,
  SkPoint,
  SkRect,
} from '@shopify/react-native-skia';

import type { LegendConfig } from '../core/Legend/types';
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
  legend?: LegendConfig;
  centerLabel?: Omit<CenterLabelProps, 'center' | 'font'>;
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

export interface CenterLabelProps {
  label: { text: string; fontSize: number };
  annotation?: { text: string; fontSize: number };
  gap?: number;
  center: SkPoint;
  font: DataSourceParam;
}

export type GetPieChartLayoutParams = {
  width: number;
  height: number;
  legend: Required<LegendConfig>;
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

export type GetPieChartLayout = (
  params: GetPieChartLayoutParams,
) => PieChartLayout;

export interface PieChartPieceWithAngles extends PieChartPiece {
  startAngle: number;
  sweepAngle: number;
}

export type GetDataWithAngles = (
  data: PieChartPiece[],
  total: number,
  startAngle: number,
) => PieChartPieceWithAngles[];

export type GetContentDimensions = (params: GetPieChartLayoutParams) => {
  contentWidth: number;
  contentHeight: number;
};
