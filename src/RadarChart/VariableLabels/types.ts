import type { SkFont, SkPoint } from '@shopify/react-native-skia';

export interface VariableLabelsProps<T extends string> {
  variables: T[];
  angles: Record<T, number>;
  center: SkPoint;
  radius: number;
  font: SkFont | null;
  fontSize: number;
  orientation?: 'radial' | 'horizontal';
}

export interface LabelProps {
  variable: string;
  angle: number;
  center: SkPoint;
  radius: number;
  font: SkFont;
  fontSize: number;
  gap?: number;
}
