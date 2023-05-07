import type { SkPoint } from '@shopify/react-native-skia';

import type { XAxisConfig, YAxisConfig } from '../core/Axes/types';
import type { GridlinesConfig } from '../core/Gridlines/types';
import type { ChartBaseProps } from '../types';
import type { LegendConfig } from './Legend/types';
import type { MarkerConfig } from './Marker/types';

export interface ScatterPoint {
  x: number;
  y: number;
  value?: number;
  color?: string;
}

export interface RenderMarkerParams {
  mapDomainToProps(point: SkPoint): SkPoint;
}

export interface ScatterProps<T extends ScatterPoint> extends ChartBaseProps {
  xDomain: [number, number];
  yDomain: [number, number];
  valueDomain?: [number, number];
  valueDomainColors?: string[];
  xTicks: number[];
  yTicks: number[];
  data: T[];
  legend?: LegendConfig;
  xAxis?: XAxisConfig;
  yAxis?: YAxisConfig;
  marker?: MarkerConfig;
  renderMarker?: React.FC<T & RenderMarkerParams>;
  gridlines?: GridlinesConfig | null;
  // TODO: Remove when proper legend system will be implemented
  showContinuousLegend?: boolean;
}
