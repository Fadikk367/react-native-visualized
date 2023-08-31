import type { SkFont, SkPoint } from '@shopify/react-native-skia';

import type { LegendConfig } from '../core/Legend/types';
import type { ChartBaseProps } from '../types';

export type RadarChartType = <T extends string>(
  props: RadarChartProps<T>,
) => React.ReactElement;

export interface RadarChartProps<T extends string> extends ChartBaseProps {
  data: (Record<T, number> & { color: string; label: string })[];
  ticks: number[];
  domain: [number, number];
  variables: T[];
  labelsOrientation?: 'radial' | 'horizontal';
  legend?: LegendConfig;
  labelsPadding?: number;
  gridLines?: Partial<LineConfig> | null;
  axes?: Partial<LineConfig> | null;
  polygons?: Partial<PolygonConfig>;
}

export interface AnimatedPolygonProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  values: Record<T, number> & { color: string };
  center: SkPoint;
  config: PolygonConfig;
  mapValueToDomain(v: number): number;
}

export interface AxesProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  radius: number;
  center: SkPoint;
  config: Partial<LineConfig>;
}

export interface GridLinesProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  ticks: number[];
  center: SkPoint;
  config: Partial<LineConfig>;
  mapValueToDomain(v: number): number;
}

export interface TicksLabelsProps {
  ticks: number[];
  center: SkPoint;
  font: SkFont | null;
  fontSize: number;
  mapValueToDomain(v: number): number;
}

export interface LineConfig {
  color: string;
  lineWidth: number;
  opacity: number;
}

export interface PolygonConfig {
  fillOpacity: number;
  outlineOpacity: number;
  lineWidth: number;
}
