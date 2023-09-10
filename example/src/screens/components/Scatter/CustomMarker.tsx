import React from 'react';

import { Circle, Group, SkPoint } from '@shopify/react-native-skia';

export interface ScatterPoint {
  x: number;
  y: number;
  color?: string;
}

export interface RenderMarkerParams extends ScatterPoint {
  mapDomainToProps(point: SkPoint): SkPoint;
}

const CustomMarker = ({
  x,
  y,
  color = 'lightskyblue',
  mapDomainToProps,
}: RenderMarkerParams) => {
  const { x: canvasX, y: canvasY } = mapDomainToProps({ x, y });

  return (
    <Group>
      <Circle cx={canvasX} cy={canvasY} r={11} color="darkblue" opacity={0.7} />
      <Circle cx={canvasX} cy={canvasY} r={9} color={color} opacity={0.7} />
      <Circle cx={canvasX} cy={canvasY} r={3} color="blue" />
    </Group>
  );
};

export default CustomMarker;
