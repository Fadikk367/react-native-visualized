import type { SkPoint } from '@shopify/react-native-skia';

export interface GridlinesConfig {
  vertical?: boolean;
  horizontal?: boolean;
  lineWidth?: number;
  opacity?: number;
  color?: string;
}

export interface GridlinesProps extends GridlinesConfig {
  xTicks?: number[];
  yTicks?: number[];
  xDomain: [number, number];
  yDomain: [number, number];
  mapDomainToCanvas(point: SkPoint): SkPoint;
}
