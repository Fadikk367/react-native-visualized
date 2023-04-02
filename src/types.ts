import type { ViewStyle } from 'react-native';

import type { DataSourceParam } from '@shopify/react-native-skia';

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface ChartBaseProps {
  width: number;
  height: number;
  padding?: Partial<ChartPadding>;
  backgroundColor?: ViewStyle['backgroundColor'];
  font: DataSourceParam;
  fontSize?: number;
}
