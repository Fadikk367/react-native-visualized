import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import type { MarkerVariantProps } from './types';

const DotMarker = ({ x, y, size, color }: MarkerVariantProps) => {
  return <Circle cx={x} cy={y} r={size} color={color} />;
};

export default DotMarker;
