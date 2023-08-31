import type { DataSourceParam, SkFont } from '@shopify/react-native-skia';

export interface LegendItem {
  color: string;
  label: string;
}

export interface LegendProps extends Omit<LegendConfig, 'gap'> {
  width: number;
  height: number;
  items: LegendItem[];
  marker?: LegendMarker;
  font: DataSourceParam;
  fontSize?: number;
  textColor?: string;
}

export interface LegendItemProps extends LegendItem {
  x?: number;
  y?: number;
  height: number;
  width: number;
  marker: Required<LegendMarker>;
  font: SkFont | null;
  fontSize: number;
  textColor: string;
}

export interface LegendConfig {
  width: number;
  height: number;
  position?: LegendPosition;
  gap?: number;
  textColor?: string;
}

export type LegendPosition = 'left' | 'right' | 'top' | 'bottom';

export type LegendMarker = { radius?: number } & (
  | { size?: number }
  | Dimensions
);

interface GetLegendItemLayoutParams {
  width: number;
  height: number;
  itemsCount: number;
  orientation: Orientation;
}

export type Orientation = 'horizontal' | 'vertical';

interface LegendItemLayout {
  x: number;
  y: number;
  height: number;
  width: number;
}

export type GetLegendItemLayout = (
  params: GetLegendItemLayoutParams,
) => (index: number) => LegendItemLayout;

export interface Dimensions {
  width: number;
  height: number;
}
