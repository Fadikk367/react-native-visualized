import React from 'react';

import { Circle, Group } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import type { RadarChartProps } from './types';

const RadarChart = <T extends string>({
  data,
  height,
  width,
  padding: customPadding,
  backgroundColor,
}: RadarChartProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);

  const polygons = data.map((_, i) => <Group key={i} />);

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Circle cx={200} cy={150} r={50} />
      {polygons}
    </ChartContainer>
  );
};

export default RadarChart;
