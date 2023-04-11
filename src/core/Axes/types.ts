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
  mapDomainToCanvas(point: SkPoint): SkPoint;
}
