import React from 'react';

import BaseLineChart from '../core/BaseLineChart';
import type { RenderPath } from '../core/BaseLineChart/types';
import AnimatedArea from './AnimatedArea';
import Area from './Area';
import type { AreaChartProps, AreaData } from './types';
import { normalizeAreasData, stackAreasData } from './utils';

const AreaChart = ({
  data,
  stacked = false,
  normalized = false,
  animated = true,
  opacity,
  stroke,
  ...baseLineChartProps
}: AreaChartProps) => {
  const transformedData = stacked ? stackAreasData(data).reverse() : data;

  const normalizedData = normalized
    ? stackAreasData(
        normalizeAreasData(data, baseLineChartProps.yDomain),
      ).reverse()
    : transformedData;

  const AreaComponent = animated ? AnimatedArea : Area;

  const renderAreaPath: RenderPath<AreaData> = (
    areaData,
    yDomain,
    mapDomainToCanvas,
  ) => {
    return (
      <AreaComponent
        key={`${areaData.id}/${stacked}/${animated}`}
        data={{
          opacity: opacity,
          stroke: stroke,
          ...areaData,
        }}
        yDomain={yDomain}
        stacked={stacked}
        normalized={stacked}
        mapDomainToCanvas={mapDomainToCanvas}
      />
    );
  };

  return (
    <BaseLineChart
      {...baseLineChartProps}
      data={normalizedData}
      renderPath={renderAreaPath}
    />
  );
};

export default AreaChart;
