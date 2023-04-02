import React from 'react';

import { Group, Path, SkPoint } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import XLables from './XLables';
import YLabels from './YLabels';
import type { LineChartProps } from './types';
import { buildPath } from './utils';

const LineChart = ({
  width,
  height,
  data,
  xDomain,
  yDomain,
  xLabels,
  yLabels,
  padding: customPadding,
  backgroundColor,
  font,
  fontSize,
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

  const path = buildPath(data, mapDomainToCanvas);

  return (
    <ChartContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}>
      <Group transform={[{ translateX: yLabelsWidth }]}>
        <Path
          path={path}
          color="lightskyblue"
          strokeWidth={5}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
        />
      </Group>
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
