import type { SkPoint } from '@shopify/react-native-skia';

export interface GridlinesProps {
  vertical?: boolean;
  horizontal?: boolean;
  xTicks?: number[];
  yTicks?: number[];
  xDomain: [number, number];
  yDomain: [number, number];
  lineWidth?: number;
  opacity?: number;
  color?: string;
  mapDomainToCanvas(point: SkPoint): SkPoint;
}
