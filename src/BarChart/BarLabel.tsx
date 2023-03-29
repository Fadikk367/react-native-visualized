import React from 'react';

import { RoundedRect } from '@shopify/react-native-skia';

import type { BarLabelProps } from './types';

const BarLabel = ({ label, space, height }: BarLabelProps) => {
  return (
    // Placeholder, will be some Text
    <RoundedRect
      x={0}
      y={0}
      width={space - 2}
      height={height}
      r={label.length}
      color="green"
      opacity={0.5}
    />
  );
};

export default BarLabel;
