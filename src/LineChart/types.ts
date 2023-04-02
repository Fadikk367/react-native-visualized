import type { DataSourceParam, SkPoint } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';

export interface LineChartProps extends ChartBaseProps {
  data: { x: number; y: number }[];
  yDomain: [number, number];
  xDomain: [number, number];
  yLabels: number[];
  xLabels: number[];
}

export interface XLabels {
  labels: number[];
  width: number;
  height: number;
  font: DataSourceParam;
  fontSize?: number;
  mapDomainToCanvas(point: SkPoint): SkPoint;
}
