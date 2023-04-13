import React from 'react';

import { Rect } from '@shopify/react-native-skia';

import type { MarkerVariantProps } from './types';

const SquareMarker = ({ x, y, size, color }: MarkerVariantProps) => {
  return (
    <Rect
      x={x - size}
      y={y - size}
      width={2 * size}
      height={2 * size}
      color={color}
    />
  );
};

export default SquareMarker;
