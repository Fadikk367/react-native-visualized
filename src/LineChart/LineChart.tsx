import React from 'react';

import { Group, Path, SkPoint } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import XLables from './XLables';
import YLabels from './YLabels';
import type { LineChartProps } from './types';
import { buildPath, extractProps } from './utils';

const LineChart = ({
  width,
  height,
  xDomain,
  yDomain,
  xLabels,
  yLabels,
  padding: customPadding,
  backgroundColor,
  font,
  fontSize,
  children,
}: LineChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const yLabelsWidth = 30;
  const xLabelsHeight = 30;
  const contentWidth = width - (padding.left + yLabelsWidth + padding.right);
  const contentHeight = height - (padding.top + xLabelsHeight + padding.bottom);
  const yDomainSize = Math.abs(yDomain[1] - yDomain[0]);
  const xDomainSize = Math.abs(xDomain[1] - xDomain[0]);

  const mapDomainToCanvas = ({ x, y }: SkPoint): SkPoint => {
    return {
      x: (contentWidth / xDomainSize) * x,
      y: contentHeight - (contentHeight / yDomainSize) * y,
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
      <Group transform={[{ translateX: yLabelsWidth }]}>{paths}</Group>
      <YLabels
        labels={yLabels}
        width={yLabelsWidth}
        height={contentHeight}
        font={font}
        fontSize={fontSize}
        mapDomainToCanvas={mapDomainToCanvas}
      />
      <Group
        transform={[
          { translateX: yLabelsWidth },
          {
            translateY: contentHeight,
          },
        ]}>
        <XLables
          labels={xLabels}
          width={contentWidth}
          height={xLabelsHeight}
          font={font}
          fontSize={fontSize}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </ChartContainer>
  );
};

export default LineChart;
