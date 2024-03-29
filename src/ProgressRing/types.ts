import type {
  DataSourceParam,
  SkPoint,
  SkRect,
} from '@shopify/react-native-skia';

import type { LegendConfig } from '../core/Legend/types';
import type { ChartBaseProps } from '../types';

export interface RingData {
  label: string;
  color: string;
  value: number;
  full: number;
  start?: number;
}

export interface ProgressRingProps extends ChartBaseProps {
  data: RingData[];
  ringsSpacing?: number;
  startAngle?: number;
  ringWidth?: number;
  legend?: LegendConfig;
  centerLabel?: {
    text: string;
    fontSize?: number;
    color?: string;
  };
}

export interface CenterLabelProps {
  text: string;
  fontSize?: number;
  color?: string;
  font: DataSourceParam;
  center: SkPoint;
}

export interface RingProps extends RingData {
  boundingSquare: SkRect;
  center: SkPoint;
  ringWidth: number;
  ringsSpacing: number;
  index: number;
}
