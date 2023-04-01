import React from 'react';

import { RoundedRect } from '@shopify/react-native-skia';

import type { BarProps } from './types';

const Bar = ({
  value,
  space,
  ratio,
  padding,
  base,
  mapDomainToCanvas,
}: BarProps) => {
  return (
    <RoundedRect
      x={padding}
      y={mapDomainToCanvas(base)}
      width={space * ratio}
      height={Math.max(mapDomainToCanvas(value) - mapDomainToCanvas(base), 0)}
      r={16}
      color="blue"
    />
  );
};

export default Bar;
