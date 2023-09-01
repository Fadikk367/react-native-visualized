import React from 'react';

import { Group, SkPoint, rect } from '@shopify/react-native-skia';

import XAxis from '../Axes/XAxis';
import YAxis from '../Axes/YAxis';
import Gridlines from '../Gridlines';
import Legend from '../Legend';
import { defaultLegendConfig } from '../Legend/constants';
import Translate from '../Translate/Translate';
import { ensureDefaults, getIsWithinDomain } from '../utils';
import withPadding from '../withPadding';
import type { BaseLineChartProps } from './types';

const BaseLineChart = <T extends { label: string; color: string }>({
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
  legend: customLegendConfig,
  renderPath,
}: BaseLineChartProps<T>) => {
  // FIXME: Fix when working on simple layout engine - at this point we should not care about the marker
  // @ts-expect-error
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);
  const xAxisHeight = xAxis?.height || 30;
  const yAxisWidth = yAxis?.width || 30;
  const contentWidth = width - yAxisWidth;
  const contentHeight = height - (xAxisHeight + legendConfig.height);
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
      {customLegendConfig && (
        <Translate x={yAxisWidth}>
          <Legend
            {...legendConfig}
            width={legendConfig.width || contentWidth}
            items={data}
            font={font}
            marker={customLegendConfig.marker}
            position="top"
          />
        </Translate>
      )}
      <Translate y={legendConfig.height}>
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
      </Translate>
    </>
  );
};

export default withPadding(BaseLineChart);
