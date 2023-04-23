import React from 'react';

import { Path, Skia } from '@shopify/react-native-skia';

import type { PieSliceProps } from './types';

const PieSlice = ({
  color,
  startAngle,
  sweepAngle,
  boundingSquare,
  center,
}: PieSliceProps) => {
  const path = Skia.Path.Make();

  path.addArc(boundingSquare, startAngle, sweepAngle);
  path.lineTo(center.x, center.y);

  return <Path path={path} style="fill" color={color} strokeWidth={0} />;
};

export default PieSlice;
