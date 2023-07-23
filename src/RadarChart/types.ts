import type { SkFont, SkPoint } from '@shopify/react-native-skia';

import type { LegendConfig } from '../PieChart/Legend/types';
import type { ChartBaseProps } from '../types';

export interface RadarChartProps<T extends string> extends ChartBaseProps {
  data: (Record<T, number> & { color: string; label: string })[];
  ticks: number[];
  domain: [number, number];
  variables: T[];
  labelsOrientation?: 'radial' | 'horizontal';
  legend?: LegendConfig;
  labelsPadding?: number;
  gridLines?: Partial<GridLinesConfig> | null;
}

export interface AnimatedPolygonProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  values: Record<T, number> & { color: string };
  center: SkPoint;
  mapValueToDomain(v: number): number;
}

export interface GridLinesProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  ticks: number[];
  center: SkPoint;
  config: Partial<GridLinesConfig>;
  mapValueToDomain(v: number): number;
}

export interface TicksLabelsProps {
  ticks: number[];
  center: SkPoint;
  font: SkFont | null;
  fontSize: number;
  mapValueToDomain(v: number): number;
}

export interface GridLinesConfig {
  color: string;
  lineWidth: number;
  opacity: number;
}
