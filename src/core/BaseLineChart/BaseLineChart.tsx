import React from 'react';

import { Group, SkPoint, rect } from '@shopify/react-native-skia';

import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import ChartContainer from '../ChartContainer';
import Gridlines from '../Gridlines';
import { defaultPadding } from '../constants';
import { ensureDefaults, getIsWithinDomain } from '../utils';
import type { BaseLineChartProps } from './types';

const BaseLineChart = <T,>({
  width,
  height,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  padding: customPadding,
  backgroundColor,
  font,
  gridlines: gridlinesConfig,
  xAxis,
  yAxis,
  data,
  renderPath,
}: BaseLineChartProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const xAxisHeight = xAxis?.height || 30;
  const yAxisWidth = yAxis?.width || 30;
  const contentWidth = width - (padding.left + yAxisWidth + padding.right);
  const contentHeight = height - (padding.top + xAxisHeight + padding.bottom);
  const yDomainSize = Math.abs(yDomain[1] - yDomain[0]);
  const xDomainSize = Math.abs(xDomain[1] - xDomain[0]);

  const xTicksWithinDomain = xTicks.filter(getIsWithinDomain(xDomain));
  const yTicksWithinDomain = yTicks.filter(getIsWithinDomain(yDomain));

  const mapDomainToCanvas = ({ x, y }: SkPoint): SkPoint => {
    return {
      x: (contentWidth / xDomainSize) * (x - xDomain[0]),
      y: contentHeight - (contentHeight / yDomainSize) * (y - yDomain[0]),
    };
  };

  const paths = data.map(pathData =>
    renderPath(pathData, yDomain, mapDomainToCanvas),
  );

  return (
    <ChartContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}>
      <Group transform={[{ translateX: yAxisWidth }]}>
        <Gridlines
          {...gridlinesConfig}
          xTicks={xTicks}
          yTicks={yTicks}
          xDomain={xDomain}
          yDomain={yDomain}
          mapDomainToCanvas={mapDomainToCanvas}
        />
        <Group clip={rect(0, 0, contentWidth, contentHeight)}>{paths}</Group>
      </Group>
      <YAxis
        ticks={yTicksWithinDomain}
        width={yAxisWidth}
        height={contentHeight}
        font={font}
        {...yAxis}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Group
        transform={[
          { translateX: yAxisWidth },
          {
            translateY: contentHeight,
          },
        ]}>
        <XAxis
          ticks={xTicksWithinDomain}
          width={contentWidth}
          height={xAxisHeight}
          font={font}
          {...xAxis}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </ChartContainer>
  );
};

export default BaseLineChart;
