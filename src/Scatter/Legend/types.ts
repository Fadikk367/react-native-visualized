import type { DataSourceParam } from '@shopify/react-native-skia';

export interface ContinuousColorLegendProps {
  width: number;
  height: number;
  colors: string[];
  domain: [number, number];
  ticks: number[];
  font: DataSourceParam;
  fontSize?: number;
}
