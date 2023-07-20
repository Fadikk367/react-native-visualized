import type { SkPoint } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../types';

export interface RadarChartProps<T extends string> extends ChartBaseProps {
  data: (Record<T, number> & { color: string })[];
  ticks: number[];
  domain: [number, number];
  variables: T[];
  labelsOrientation?: 'radial' | 'horizontal';
}

export interface AnimatedPolygonProps<T extends string> {
  variables: T[];
  variableAngles: Record<T, number>;
  values: Record<T, number> & { color: string };
  center: SkPoint;
  mapValueToDomain(v: number): number;
}
