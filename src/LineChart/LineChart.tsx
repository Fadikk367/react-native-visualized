import React from 'react';

import BaseLineChart from '../core/BaseLineChart';
import type { RenderPath } from '../core/BaseLineChart/types';
import AnimatedLine from './AnimatedLine';
import Line from './Line';
import type { LineChartProps, LineData } from './types';

const LineChart = ({
  animated = true,
  ...baseLineChartProps
}: LineChartProps) => {
  const LineComponent = animated ? AnimatedLine : Line;

  const renderPath: RenderPath<LineData> = (data, _, mapDomainToCanvas) => {
    return (
      <LineComponent
        key={data.label}
        data={data}
        mapDomainToCanvas={mapDomainToCanvas}
      />
    );
  };

  return <BaseLineChart {...baseLineChartProps} renderPath={renderPath} />;
};

export default LineChart;
