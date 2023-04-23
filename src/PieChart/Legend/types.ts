import type { DataSourceParam, SkFont } from '@shopify/react-native-skia';

export interface LegendItem {
  color: string;
  label: string;
}

export interface LegendProps extends Omit<LegendConfig, 'gap'> {
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

export interface LegendConfig {
  width: number;
  height: number;
  position?: LegendPosition;
  gap?: number;
}

export type LegendPosition = 'left' | 'right' | 'top' | 'bottom';

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
}

export type GetLegendItemLayout = (
  params: GetLegendItemLayoutParams,
) => (index: number) => LegendItemLayout;
