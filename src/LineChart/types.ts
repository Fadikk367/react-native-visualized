import type { XAxisConfig, YAxisConfig } from '../core/Axes/types';
import type { ArrowVariant } from '../core/AxisArrow/types';
import type { GridlinesConfig } from '../core/Gridlines/types';
import type { ChartBaseProps } from '../types';

export interface LineData {
  points: { x: number; y: number }[];
  color?: string;
  strokeWidth?: number;
}
export interface ArrowConfig {
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
  arrows?: ArrowConfig;
  data: LineData[];
  xAxis?: XAxisConfig;
  yAxis?: YAxisConfig;
}
