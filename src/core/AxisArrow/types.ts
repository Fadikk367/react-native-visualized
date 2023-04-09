import type { SkPoint } from '@shopify/react-native-skia';

export interface AxisArrowProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  variant?: 'classic' | 'diamond';
  length?: number;
  width?: number;
  anchor: SkPoint;
}
