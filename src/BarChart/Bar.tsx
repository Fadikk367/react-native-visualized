import React from 'react';

import { RoundedRect } from '@shopify/react-native-skia';

import type { BarProps } from './types';

const Bar = ({ value, space, ratio, padding, mapDomainToCanvas }: BarProps) => {
  return (
    <RoundedRect
      x={padding}
      y={0}
      width={space * ratio}
      height={mapDomainToCanvas(value)}
      r={16}
      color="blue"
    />
  );
};

export default Bar;
