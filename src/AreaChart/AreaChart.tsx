import React from 'react';

import { Path } from '@shopify/react-native-skia';
import type { RenderPath } from 'src/core/BaseLineChart/types';

import BaseLineChart from '../core/BaseLineChart';
import type { AreaChartProps, AreaData } from './types';
import { buildAreaPath } from './utils';

const AreaChart = ({ ...baseLineChartProps }: AreaChartProps) => {
  const renderPath: RenderPath<AreaData> = (
    data,
    domainY,
    mapDomainToCanvas,
  ) => {
    const { id, points, color, opacity = 1 } = data;
    const path = buildAreaPath(points, domainY, mapDomainToCanvas);

    return (
      <Path
        key={id}
        path={path}
        color={color}
        strokeWidth={0}
        opacity={opacity}
        style="fill"
        strokeCap="round"
        strokeJoin="round"
      />
    );
  };

  return <BaseLineChart {...baseLineChartProps} renderPath={renderPath} />;
};

export default AreaChart;
