import React from 'react';

import { Path, Skia } from '@shopify/react-native-skia';

import type { RingProps } from './types';

const Ring = ({
  value,
  full,
  ringWidth,
  ringsSpacing,
  boundingSquare,
  start,
  center,
  startAngle,
  index,
  color,
}: RingProps) => {
  const path = Skia.Path.Make();
  const backgroundPath = Skia.Path.Make();

  const sweepAngle = Math.min(value / full, 1) * 360;
  const ringStartAngle = Math.min((start || 0) / full, 1) * 360;
  const diameterDecrease = index * (2 * ringWidth + ringsSpacing);
  const ringRadius = (boundingSquare.width - diameterDecrease) / 2;

  path.addArc(
    {
      x: boundingSquare.x + diameterDecrease / 2 + ringWidth / 2,
      y: boundingSquare.y + diameterDecrease / 2 + ringWidth / 2,
      width: ringRadius * 2 - ringWidth,
      height: ringRadius * 2 - ringWidth,
    },
    startAngle - 90 + ringStartAngle,
    sweepAngle,
  );

  backgroundPath.addCircle(center.x, center.y, ringRadius - ringWidth / 2);

  return (
    <>
      <Path
        path={backgroundPath}
        style="stroke"
        color={color}
        opacity={0.3}
        strokeWidth={ringWidth}
        strokeCap="round"
      />
      <Path
        path={path}
        style="stroke"
        color={color}
        strokeWidth={ringWidth}
        strokeCap="round"
      />
    </>
  );
};

export default Ring;
