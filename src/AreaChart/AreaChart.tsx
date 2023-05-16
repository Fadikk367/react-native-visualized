import React from 'react';

import { Path } from '@shopify/react-native-skia';
import type { RenderPath } from 'src/core/BaseLineChart/types';

import BaseLineChart from '../core/BaseLineChart';
import type { AreaChartProps, AreaData } from './types';
import { buildAreaPath, stackAreasData } from './utils';

const AreaChart = ({
  data,
  stacked = false,
  ...baseLineChartProps
}: AreaChartProps) => {
  const transformedData = stacked ? stackAreasData(data).reverse() : data;

  const renderAreaPath: RenderPath<AreaData> = (
    areaData,
    domainY,
    mapDomainToCanvas,
  ) => {
    const { id, points, color, opacity = 1 } = areaData;
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

  return (
    <BaseLineChart
      {...baseLineChartProps}
      data={transformedData}
      renderPath={renderAreaPath}
    />
  );
};

export default AreaChart;
