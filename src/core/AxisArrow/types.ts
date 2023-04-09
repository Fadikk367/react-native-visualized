import type { SkPoint } from '@shopify/react-native-skia';

export type Direction = 'left' | 'right' | 'up' | 'down';

export type ArrowVariant = 'classic' | 'diamond';
export interface AxisArrowProps {
  direction?: Direction;
  variant?: ArrowVariant;
  length?: number;
  width?: number;
  anchor: SkPoint;
}
