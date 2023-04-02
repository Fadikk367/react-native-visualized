import React from 'react';

import { Canvas, Path, Skia } from '@shopify/react-native-skia';

import type { LineChartProps } from './types';

const LineChart = ({ width, height, data }: LineChartProps) => {
  const path = Skia.Path.Make();

  const firstPoint = data[0] ?? { x: 0, y: 0 };
  path.moveTo(firstPoint.x || 0, firstPoint.y || 0);
  for (let i = 1; i < data.length; i++) {
    const point = data[i];
    path.lineTo(point?.x || 0, point?.y || 0);
  }

  return (
    <Canvas style={{ width, height, backgroundColor: 'white' }}>
      <Path
        path={path}
        color="lightskyblue"
        strokeWidth={8}
        style="stroke"
        strokeCap="round"
      />
    </Canvas>
  );
};

export default LineChart;
