import React from 'react';

import { Line } from '@shopify/react-native-skia';

import { degreesToRadians } from '../core/utils';
import type { SliceSpacesProps } from './types';

const SliceSpaces = ({
  angles,
  spacing,
  radius,
  center,
  color,
}: SliceSpacesProps) => {
  const spacingLines = angles.map(angle => {
    const x = Math.cos(degreesToRadians(angle)) * radius + center.x;
    const y = Math.sin(degreesToRadians(angle)) * radius + center.y;

    return (
      <Line
        key={angle}
        p1={center}
        p2={{ x, y }}
        strokeWidth={spacing}
        color={color}
      />
    );
  });

  return <>{spacingLines}</>;
};

export default SliceSpaces;
