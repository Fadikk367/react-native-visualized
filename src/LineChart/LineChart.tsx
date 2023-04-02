import React from 'react';

import { Canvas, Path, SkPoint } from '@shopify/react-native-skia';

import type { LineChartProps } from './types';
import { buildPath } from './utils';

const LineChart = ({
  width,
  height,
  data,
  xDomain,
  yDomain,
  backgroundColor = 'white',
}: LineChartProps) => {
  const contentWidth = width;
  const contentHeight = height;
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
    <Canvas style={{ width, height, backgroundColor }}>
      <Path
        path={path}
        color="lightskyblue"
        strokeWidth={8}
        style="stroke"
        strokeCap="round"
        strokeJoin="round"
      />
    </Canvas>
  );
};

export default LineChart;
