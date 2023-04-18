import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import type { PieChartProps } from './types';

const PieChart = ({
  width,
  height,
  padding: customPadding,
  backgroundColor,
}: PieChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Circle cx={100} cy={100} r={50} />
    </ChartContainer>
  );
};

export default PieChart;
