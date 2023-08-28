import React from 'react';

import { Group, SkPoint, rect } from '@shopify/react-native-skia';

import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import Gridlines from '../Gridlines';
import Translate from '../Translate/Translate';
import { getIsWithinDomain } from '../utils';
import withPadding from '../withPadding';
import type { BaseLineChartProps } from './types';

const BaseLineChart = <T,>({
  width,
  height,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  font,
  gridlines: gridlinesConfig,
  xAxis,
  yAxis,
  data,
  renderPath,
}: BaseLineChartProps<T>) => {
  const xAxisHeight = xAxis?.height || 30;
  const yAxisWidth = yAxis?.width || 30;
  const contentWidth = width - yAxisWidth;
  const contentHeight = height - xAxisHeight;
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
    <>
      <Translate x={yAxisWidth}>
        <Gridlines
          {...gridlinesConfig}
          xTicks={xTicks}
          yTicks={yTicks}
          xDomain={xDomain}
          yDomain={yDomain}
          mapDomainToCanvas={mapDomainToCanvas}
        />
        <Group clip={rect(0, 0, contentWidth, contentHeight)}>{paths}</Group>
      </Translate>
      <YAxis
        ticks={yTicksWithinDomain}
        width={yAxisWidth}
        height={contentHeight}
        font={font}
        {...yAxis}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Translate x={yAxisWidth} y={contentHeight}>
        <XAxis
          ticks={xTicksWithinDomain}
          width={contentWidth}
          height={xAxisHeight}
          font={font}
          {...xAxis}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Translate>
    </>
  );
};

export default withPadding(BaseLineChart);
