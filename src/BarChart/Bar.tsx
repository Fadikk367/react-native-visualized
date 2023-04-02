import React from 'react';

import { RoundedRect } from '@shopify/react-native-skia';

import type { BarProps } from './types';

const Bar = ({
  value,
  space,
  ratio,
  base,
  color = 'blue',
  radius = 5,
  mapDomainToCanvas,
}: BarProps) => {
  const padding = (space - space * ratio) / 2;

  return (
    <RoundedRect
      x={padding}
      y={mapDomainToCanvas(base)}
      width={space * ratio}
      height={Math.max(mapDomainToCanvas(value) - mapDomainToCanvas(base), 0)}
      r={radius}
      color={color}
    />
  );
};

export default Bar;
