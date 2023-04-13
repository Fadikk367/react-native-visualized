import React from 'react';

import { Line } from '@shopify/react-native-skia';

import type { MarkerVariantProps } from './types';

const CrossMarker = ({ x, y, size, color }: MarkerVariantProps) => {
  const lineWidth = 2;
  return (
    <>
      <Line
        p1={{ x: x - size, y }}
        p2={{ x: x + size, y }}
        strokeWidth={lineWidth}
        color={color}
      />
      <Line
        p1={{ x: x, y: y - size }}
        p2={{ x: x, y: y + size }}
        strokeWidth={lineWidth}
        color={color}
      />
    </>
  );
};

export default CrossMarker;
