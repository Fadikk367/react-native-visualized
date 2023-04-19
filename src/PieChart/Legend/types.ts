import type { DataSourceParam, SkFont } from '@shopify/react-native-skia';

export interface LegendItem {
  color: string;
  label: string;
}

export interface LegendProps {
  width: number;
  height: number;
  items: LegendItem[];
  font: DataSourceParam;
  fontSize?: number;
}

export interface LegendItemProps extends LegendItem {
  x?: number;
  y?: number;
  height: number;
  font: SkFont | null;
  fontSize: number;
}
