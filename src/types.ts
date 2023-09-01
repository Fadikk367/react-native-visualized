import type { DataSourceParam } from '@shopify/react-native-skia';

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface ChartBaseProps {
  width: number;
  height: number;
  padding?: Partial<Padding>;
  backgroundColor?: string;
  font: DataSourceParam;
  fontSize?: number;
}
