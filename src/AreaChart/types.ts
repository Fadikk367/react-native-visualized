import type { SkPoint } from '@shopify/react-native-skia';

import type { BaseLineChartProps } from '../core/BaseLineChart/types';

export interface GradientConfig {
  start: SkPoint;
  end: SkPoint;
  colors: string[];
  positions?: number[];
}

export interface AreaData {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  fill?: string | GradientConfig;
  opacity?: number;
  stroke?: number;
}

export interface AreaChartProps
  extends Omit<BaseLineChartProps<AreaData>, 'renderPath'> {
  stacked?: boolean;
  normalized?: boolean;
  data: AreaData[];
  animated?: boolean;
  opacity?: number;
  stroke?: number;
}

export interface AreaProps {
  data: AreaData;
  yDomain: [number, number];
  stacked: boolean;
  normalized: boolean;
  mapDomainToCanvas: (point: SkPoint) => SkPoint;
}

export interface AreaFillProps {
  fill: string | GradientConfig;
}
