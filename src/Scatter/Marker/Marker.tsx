import React from 'react';

import { Group } from '@shopify/react-native-skia';

import CrossMarker from './CrossMarker';
import DotMarker from './DotMarker';
import SquareMarker from './SquareMarker';
import type { MarkerProps } from './types';

const renderMarkerByVariant = {
  dot: DotMarker,
  square: SquareMarker,
  cross: CrossMarker,
};

const Marker = ({
  x,
  y,
  size = 5,
  color = 'black',
  variant = 'dot',
  mapDomainToCanvas,
}: MarkerProps) => {
  const { x: canvasX, y: canvasY } = mapDomainToCanvas({ x, y });
  const RenderMarker = renderMarkerByVariant[variant];

  return (
    <Group>
      <RenderMarker x={canvasX} y={canvasY} size={size} color={color} />
    </Group>
  );
};

export default Marker;
