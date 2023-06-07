import React from 'react';

import { Path } from '@shopify/react-native-skia';

import BaseLineChart from '../core/BaseLineChart';
import type { RenderPath } from '../core/BaseLineChart/types';
import type { LineChartProps, LineData } from './types';
import { buildPath } from './utils';

const LineChart = ({ ...baseLineChartProps }: LineChartProps) => {
  const renderPath: RenderPath<LineData> = (data, _, mapDomainToCanvas) => {
    const { id, points, color, strokeWidth } = data;
    const path = buildPath(points, mapDomainToCanvas);

    return (
      <Path
        key={id}
        path={path}
        color={color}
        strokeWidth={strokeWidth}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
      />
    );
  };

  return <BaseLineChart {...baseLineChartProps} renderPath={renderPath} />;
};

export default LineChart;
