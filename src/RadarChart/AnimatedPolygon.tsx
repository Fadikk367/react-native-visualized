import React from 'react';

import { Group, Path, Skia } from '@shopify/react-native-skia';

import type { AnimatedPolygonProps } from './types';

const AnimatedPolygon = <T extends string>({
  values,
  center,
  variables,
  variableAngles,
  mapValueToDomain,
}: AnimatedPolygonProps<T>) => {
  const path = Skia.Path.Make();
  const points = variables.map(name => {
    const value = values[name];
    const scaledValue = mapValueToDomain(value);
    const variableAngle = variableAngles[name];

    return {
      x: Math.cos(variableAngle) * scaledValue + center.x,
      y: Math.sin(variableAngle) * scaledValue + center.y,
    };
  });

  const firstPoint = points[0] || { x: 0, y: 0 };
  path.moveTo(firstPoint.x, firstPoint.y);
  points.forEach(point => {
    path.lineTo(point.x, point.y);
  });
  path.close();

  return (
    <Group>
      <Path
        path={path}
        style="fill"
        color={values.color}
        opacity={0.3}
        strokeWidth={0}
      />
      <Path
        path={path}
        style="stroke"
        color={values.color}
        opacity={0.6}
        strokeWidth={3}
      />
    </Group>
  );
};

export default AnimatedPolygon;
