import type { ChartBaseProps, ChartPadding } from '../../types';

export interface ChartContainerProps
  extends Pick<ChartBaseProps, 'width' | 'height' | 'backgroundColor'> {
  padding: ChartPadding;
  children: React.ReactElement | React.ReactElement[];
}
