import type { GridlinesConfig } from '../core/Gridlines/types';
import type { ChartBaseProps } from '../types';
import type { MarkerConfig } from './Marker/types';

export interface ScatterPoint {
  x: number;
  y: number;
  color?: string;
}
export interface ScatterProps extends ChartBaseProps {
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
  data: ScatterPoint[];
  marker?: MarkerConfig;
  gridlines?: GridlinesConfig;
}
