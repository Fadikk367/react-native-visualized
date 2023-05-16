import type { SkPoint } from '@shopify/react-native-skia';

import type { ChartBaseProps } from '../../types';
import type { XAxisConfig, YAxisConfig } from '../Axes/types';
import type { ArrowConfig } from '../AxisArrow/types';
import type { GridlinesConfig } from '../Gridlines/types';

export interface BaseLineChartProps<T> extends ChartBaseProps {
  yDomain: [number, number];
  xDomain: [number, number];
  yTicks: number[];
  xTicks: number[];
  gridlines?: GridlinesConfig;
  arrows?: ArrowConfig;
  data: T[];
  renderPath: RenderPath<T>;
  xAxis?: XAxisConfig;
  yAxis?: YAxisConfig;
}

export type RenderPath<T> = (
  data: T,
  mapDomainToCanvas: (p: SkPoint) => SkPoint,
) => JSX.Element;
