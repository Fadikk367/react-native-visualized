import type { SkPoint } from '@shopify/react-native-skia';

import type { GridlinesConfig } from '../core/Gridlines/types';
import type { ChartBaseProps } from '../types';
import type { MarkerConfig } from './Marker/types';

export interface ScatterPoint {
  x: number;
  y: number;
  color?: string;
}

export interface RenderMarkerParams extends ScatterPoint {
  mapDomainToProps(point: SkPoint): SkPoint;
}
export interface ScatterProps extends ChartBaseProps {
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
  data: ScatterPoint[];
  marker?: MarkerConfig;
  renderMarker?: React.FC<RenderMarkerParams>;
  gridlines?: GridlinesConfig;
}
