import React from 'react';

import { Group, Path, SkPoint, rect } from '@shopify/react-native-skia';

import XAxis from '../core/Axes/XAxis';
import YAxis from '../core/Axes/YAxis';
import ChartContainer from '../core/ChartContainer';
import Gridlines from '../core/Gridlines';
import { defaultPadding } from '../core/constants';
import { ensureDefaults, getIsWithinDomain } from '../core/utils';
import type { LineChartProps } from './types';
import { buildPath, extractProps } from './utils';

const LineChart = ({
  width,
  height,
  xDomain,
  yDomain,
  xTicks,
  yTicks,
  padding: customPadding,
  backgroundColor,
  font,
  fontSize,
  gridlines: gridlinesConfig,
  arrows: arrowsConfig,
  children,
}: LineChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const yLabelsWidth = 30;
  const xLabelsHeight = 30;
  const contentWidth = width - (padding.left + yLabelsWidth + padding.right);
  const contentHeight = height - (padding.top + xLabelsHeight + padding.bottom);
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

  const dataSeries = extractProps(children);

  const paths = dataSeries.map(({ data, color, strokeWidth }) => {
    const path = buildPath(data, mapDomainToCanvas);
    return (
      <Path
        path={path}
        color={color}
        strokeWidth={strokeWidth}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
      />
    );
  });

  return (
    <ChartContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}>
      <Group transform={[{ translateX: yLabelsWidth }]}>
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
        width={yLabelsWidth}
        height={contentHeight}
        font={font}
        fontSize={fontSize}
        arrows={arrowsConfig}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Group
        transform={[
          { translateX: yLabelsWidth },
          {
            translateY: contentHeight,
          },
        ]}>
        <XAxis
          ticks={xTicksWithinDomain}
          width={contentWidth}
          height={xLabelsHeight}
          font={font}
          fontSize={fontSize}
          arrows={arrowsConfig}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </ChartContainer>
  );
};

export default LineChart;
