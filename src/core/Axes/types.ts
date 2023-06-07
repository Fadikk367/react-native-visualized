import type { DataSourceParam, SkPoint } from '@shopify/react-native-skia';

import type { ArrowConfig } from '../AxisArrow/types';

export interface AxisProps extends AxisConfig {
  ticks: number[];
  width: number;
  height: number;
  font: DataSourceParam;
  mapDomainToCanvas(point: SkPoint): SkPoint;
}

export interface AxisConfig {
  style?: AxisStyle;
  showTicks?: boolean;
  showLine?: boolean;
  arrow?: ArrowConfig;
  formatLabel?(tick: number): string;
}

export interface XAxisConfig extends AxisConfig {
  height?: number;
}

export interface YAxisConfig extends AxisConfig {
  width?: number;
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
