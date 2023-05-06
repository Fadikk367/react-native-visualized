import type { DataSourceParam, SkPoint } from '@shopify/react-native-skia';

import type { ArrowVariant } from '../AxisArrow/types';

export interface ArrowsConfig {
  variant?: ArrowVariant;
  length?: number;
  width?: number;
}

export interface AxisProps {
  ticks: number[];
  width: number;
  height: number;
  font: DataSourceParam;
  fontSize?: number;
  arrows?: ArrowsConfig;
  showTicks?: boolean;
  showLine?: boolean;
  style?: AxisStyle;
  formatLabel?(tick: number): string;
  mapDomainToCanvas(point: SkPoint): SkPoint;
}

export interface AxisStyle {
  line?: {
    strokeWidth?: number;
    color?: string;
  };
  ticks?: {
    size?: number;
    width?: number;
    color?: string;
  };
  labels?: {
    rotation?: number;
    color?: string;
    fontSize?: number;
  };
}
