import type { ArrowVariant } from '../core/AxisArrow/types';
import type { GridlinesConfig } from '../core/Gridlines/types';
import type { ChartBaseProps } from '../types';

export interface LineProps {
  data: { x: number; y: number }[];
  color?: string;
  strokeWidth?: number;
}

export type LineChartChildren =
  | React.ReactElement<LineProps>
  | React.ReactElement<LineProps>[];

export interface ArrowsConfig {
  variant?: ArrowVariant;
  length?: number;
  width?: number;
}
export interface LineChartProps extends ChartBaseProps {
  yDomain: [number, number];
  xDomain: [number, number];
  yTicks: number[];
  xTicks: number[];
  gridlines?: GridlinesConfig;
  arrows?: ArrowsConfig;
  children?: LineChartChildren;
}
