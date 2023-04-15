import type { DataSourceParam } from '@shopify/react-native-skia';

export interface LegendItem {
  color: string;
  label: string;
}

export interface LegendProps extends LegendConfig {
  width: number;
  font: DataSourceParam;
}

export interface LegendConfig {
  height?: number;
  items?: LegendItem[];
  fontSize?: number;
}
