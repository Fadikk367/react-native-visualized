import React from 'react';

import { Group, Path, SkPoint } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import XLables from './XLables';
import type { LineChartProps } from './types';
import { buildPath } from './utils';

const LineChart = ({
  width,
  height,
  data,
  xDomain,
  yDomain,
  xLabels,
  // yLabels,
  padding: customPadding,
  backgroundColor,
  font,
  fontSize,
}: LineChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const yLabelsWidth = 30;
  const contentWidth = width - (padding.left + yLabelsWidth + padding.right);
  const contentHeight = height - (padding.top + padding.bottom);
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
          strokeWidth={8}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
        />
      </Group>
      <Group
        transform={[
          { translateX: yLabelsWidth },
          { translateY: contentHeight - padding.bottom },
        ]}>
        <XLables
          labels={xLabels}
          width={contentWidth}
          height={30}
          font={font}
          fontSize={fontSize}
          mapDomainToCanvas={mapDomainToCanvas}
        />
      </Group>
    </ChartContainer>
  );
};

export default LineChart;
