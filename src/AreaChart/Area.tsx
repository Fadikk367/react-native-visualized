import React from 'react';

import { Path } from '@shopify/react-native-skia';

import { buildPath } from '../LineChart/utils';
import type { AreaProps } from './types';
import { buildAreaPath } from './utils';

const Area = ({
  data,
  yDomain,
  normalized,
  stacked,
  mapDomainToCanvas,
}: AreaProps) => {
  const { id, points, color, opacity = 1, stroke = 0 } = data;
  const path = buildAreaPath(points, yDomain, mapDomainToCanvas);
  const linePath = stroke ? buildPath(points, mapDomainToCanvas) : null;

  return (
    <React.Fragment key={`${id}/${stacked}/${normalized}`}>
      <Path
        path={path}
        color={color}
        strokeWidth={0}
        opacity={opacity}
        style="fill"
        strokeCap="round"
        strokeJoin="round"
      />
      {linePath && (
        <Path
          path={linePath}
          color={color}
          strokeWidth={stroke}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
        />
      )}
    </React.Fragment>
  );
};

export default Area;
