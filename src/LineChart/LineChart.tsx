import React from 'react';

import { Path, SkPoint } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import type { LineChartProps } from './types';
import { buildPath } from './utils';

const LineChart = ({
  width,
  height,
  data,
  xDomain,
  yDomain,
  padding: customPadding,
  backgroundColor,
}: LineChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const contentWidth = width - (padding.left + padding.right);
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
      <Path
        path={path}
        color="lightskyblue"
        strokeWidth={8}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
      />
    </ChartContainer>
  );
};

export default LineChart;
