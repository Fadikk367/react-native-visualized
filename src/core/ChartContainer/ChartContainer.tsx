import React from 'react';

import { Canvas, Group } from '@shopify/react-native-skia';

import type { ChartContainerProps } from './types';

const ChartContainer = ({
  width,
  height,
  padding,
  backgroundColor = 'white',
  children,
}: ChartContainerProps) => {
  return (
    <Canvas style={{ width, height, backgroundColor }}>
      <Group
        transform={[{ translateX: padding.left }, { translateY: padding.top }]}>
        {children}
      </Group>
    </Canvas>
  );
};

export default ChartContainer;
