import type { SkPoint } from '@shopify/react-native-skia';

import type { BaseLineChartProps } from '../core/BaseLineChart/types';

export interface LineData {
  label: string;
  points: { x: number; y: number }[];
  color: string;
  strokeWidth?: number;
}

export interface LineChartProps
  extends Omit<BaseLineChartProps<LineData>, 'renderPath'> {
  animated?: boolean;
}

export interface LineProps {
  data: LineData;
  mapDomainToCanvas(p: SkPoint): SkPoint;
}
