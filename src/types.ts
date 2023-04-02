import type { ViewStyle } from 'react-native';

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
}
