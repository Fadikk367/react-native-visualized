import type { SkPoint } from '@shopify/react-native-skia';

import type { ScatterPoint } from '../types';

export type MarkerVariant = 'dot' | 'square' | 'cross';

export interface MarkerProps extends MarkerConfig, ScatterPoint {
  mapDomainToCanvas(point: SkPoint): SkPoint;
}

export type MarkerVariantProps = Required<
  Omit<MarkerProps, 'mapDomainToCanvas' | 'variant'>
>;

export interface MarkerConfig {
  variant?: MarkerVariant;
  size?: number;
  color?: string;
}
