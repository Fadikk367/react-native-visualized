import type { DataSourceParam } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';

export interface BarData {
  value: number;
  label: string;
}

export interface BarChartProps extends ChartBaseProps {
  data: BarData[];
  yDomain: [number, number];
  barRatio?: number;
  yLabels: number[];
  yLabelsWidth?: number;
  showLines?: boolean;
  animated?: boolean;
  barColor?: string;
  barRadius?: number;
  renderBar?(props: BarProps): React.ReactElement;
}

export interface BarProps {
  value: number;
  space: number;
  ratio: number;
  base: number;
  color?: string;
  radius?: number;
  font: DataSourceParam;
  mapDomainToCanvas(v: number): number;
}

export interface BarLabelProps {
  label: string;
  space: number;
  height: number;
  fontSize?: number;
  font: DataSourceParam;
}

export interface YLabelsProps {
  labels: number[];
  width?: number;
  fontSize?: number;
  height: number;
  showDash?: boolean;
  domain: [number, number];
  font: DataSourceParam;
  mapDomainToCanvas(v: number): number;
}

export interface LabelsLinesProps {
  labels: number[];
  width: number;
  height: number;
  color?: string;
  strokeWidth?: number;
  mapDomainToCanvas(v: number): number;
}
