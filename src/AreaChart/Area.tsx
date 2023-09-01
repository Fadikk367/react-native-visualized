import React from 'react';

import { Group, Path } from '@shopify/react-native-skia';

import { buildPath } from '../LineChart/utils';
import AreaFill from './AreaFill';
import type { AreaProps } from './types';
import { buildAreaPath } from './utils';

const Area = ({
  data,
  yDomain,
  normalized,
  stacked,
  mapDomainToCanvas,
}: AreaProps) => {
  const { label, points, color, fill, opacity = 1, stroke = 0 } = data;
  const path = buildAreaPath(points, yDomain, mapDomainToCanvas);
  const linePath = stroke ? buildPath(points, mapDomainToCanvas) : null;

  return (
    <Group key={`${label}/${stacked}/${normalized}`}>
      <Path
        path={path}
        color={color}
        strokeWidth={0}
        opacity={opacity}
        style="fill"
        strokeCap="round"
        strokeJoin="round">
        {fill && <AreaFill fill={fill} />}
      </Path>
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
    </Group>
  );
};

export default Area;
