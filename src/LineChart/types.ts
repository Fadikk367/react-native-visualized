import type { DataSourceParam, SkPoint } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';

export interface LineProps {
  data: { x: number; y: number }[];
  color?: string;
  strokeWidth?: number;
}

export type LineChartChildren =
  | React.ReactElement<LineProps>
  | React.ReactElement<LineProps>[];

export interface GridlinesConfig {
  vertical?: boolean;
  horizontal?: boolean;
  lineWidth?: number;
  opacity?: number;
  color?: string;
}
export interface LineChartProps extends ChartBaseProps {
  yDomain: [number, number];
  xDomain: [number, number];
  yLabels: number[];
  xLabels: number[];
  gridlines?: GridlinesConfig;
  children?: LineChartChildren;
}

export interface XLabels {
  labels: number[];
  width: number;
  height: number;
  font: DataSourceParam;
  fontSize?: number;
  mapDomainToCanvas(point: SkPoint): SkPoint;
}
