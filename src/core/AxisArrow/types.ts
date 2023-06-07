import type { SkPoint } from '@shopify/react-native-skia';

export type Direction = 'left' | 'right' | 'up' | 'down';

export type ArrowVariant = 'classic' | 'diamond';

export interface AxisArrowProps extends ArrowConfig {
  direction?: Direction;
  anchor: SkPoint;
}

export interface ArrowConfig {
  variant?: ArrowVariant;
  length?: number;
  width?: number;
}
