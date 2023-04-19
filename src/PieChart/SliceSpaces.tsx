import React from 'react';

import { Line } from '@shopify/react-native-skia';

import type { SliceSpacesProps } from './types';

const SliceSpaces = ({ angles, spacing, radius, center }: SliceSpacesProps) => {
  const spacingLines = angles.map(angle => {
    const x = Math.cos((angle * Math.PI) / 180) * radius + center.x;
    const y = Math.sin((angle * Math.PI) / 180) * radius + center.y;

    return (
      <Line
        key={angle}
        p1={center}
        p2={{ x, y }}
        strokeWidth={spacing}
        color="white"
      />
    );
  });

  return <>{spacingLines}</>;
};

export default SliceSpaces;
