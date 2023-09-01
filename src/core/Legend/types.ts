import type { DataSourceParam, SkFont } from '@shopify/react-native-skia';

import type { Padding } from '../../types';

export interface LegendItem {
  color: string;
  label: string;
}

export interface LegendProps<T = undefined>
  extends Omit<LegendConfig<T>, 'gap'> {
  width: number;
  height: number;
  items: (LegendItem & { extras?: T })[];
  font: DataSourceParam;
}

export interface LegendItemProps extends LegendItem {
  x?: number;
  y?: number;
  height: number;
  width: number;
  marker: Required<LegendMarker>;
  font: SkFont | null;
  fontSize: number;
  fontColor: string;
}

export interface LegendConfig<T = undefined> {
  width: number;
  height: number;
  position?: LegendPosition;
  marker?: LegendMarker;
  /** For now only works for 'top' | 'bottom' positions */
  layout?: GridLayout;
  padding?: Partial<Padding>;
  gap?: number;
  fontColor?: string;
  fontSize?: number;
  formatLabel?(label: string, extras: T): string;
}

export type LegendPosition = 'left' | 'right' | 'top' | 'bottom';

export type LegendMarker = { radius?: number; gap?: number } & (
  | { size?: number }
  | Dimensions
);

interface GetLegendItemLayoutParams {
  width: number;
  height: number;
  itemsCount: number;
  orientation: Orientation;
  rows: number;
  columns: number;
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

export interface GridLayout {
  rows: number;
  columns: number;
}
