import React, { useMemo } from 'react';

import { Path } from '@shopify/react-native-skia';

import type { LineProps } from './types';
import { buildPath } from './utils';

export const Line = ({
  data: { points, color, strokeWidth },
  mapDomainToCanvas,
}: LineProps) => {
  const linePath = useMemo(
    () => buildPath(points, mapDomainToCanvas),
    [points, mapDomainToCanvas],
  );

  return (
    <Path
      path={linePath}
      color={color}
      strokeWidth={strokeWidth}
      style="stroke"
      strokeCap="round"
      strokeJoin="round"
    />
  );
};

export default Line;
