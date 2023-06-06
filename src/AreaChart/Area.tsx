import React from 'react';

import { Path } from '@shopify/react-native-skia';

import type { AreaProps } from './types';
import { buildAreaPath } from './utils';

const Area = ({
  data,
  yDomain,
  normalized,
  stacked,
  mapDomainToCanvas,
}: AreaProps) => {
  const { id, points, color, opacity = 1 } = data;
  const path = buildAreaPath(points, yDomain, mapDomainToCanvas);

  return (
    <Path
      key={`${id}/${stacked}/${normalized}`}
      path={path}
      color={color}
      strokeWidth={0}
      opacity={opacity}
      style="fill"
      strokeCap="round"
      strokeJoin="round"
    />
  );
};

export default Area;
