import React, { useEffect, useMemo } from 'react';

import {
  Group,
  Path,
  SkPath,
  Skia,
  runTiming,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import type { AnimatedPolygonProps } from './types';
import { buildPolygonPath } from './utils';

const AnimatedPolygon = <T extends string>({
  values,
  center,
  variables,
  variableAngles,
  config,
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

  const polygonPath = useMemo(
    () =>
      buildPolygonPath(
        values,
        center,
        variables,
        variableAngles,
        mapValueToDomain,
      ),
    [values, center, variables, variableAngles, mapValueToDomain],
  );

  const state = useValue<{
    current: SkPath;
    next: SkPath;
  }>({
    current: polygonPath,
    next: polygonPath,
  });

  const transition = useValue(0);

  useEffect(() => {
    state.current = {
      current: state.current.next,
      next: polygonPath,
    };
    transition.current = 0;
    runTiming(transition, { from: 0, to: 1 }, { duration: 300 });
  }, [state, transition, polygonPath]);

  const interpolatedPolygonPath = useComputedValue(() => {
    const start = state.current.current;
    const end = state.current.next;

    return end.interpolate(start, transition.current) ?? end;
  }, [state, transition]);

  return (
    <Group>
      <Path
        path={interpolatedPolygonPath}
        style="fill"
        color={values.color}
        opacity={config.fillOpacity}
        strokeWidth={0}
      />
      <Path
        path={interpolatedPolygonPath}
        style="stroke"
        color={values.color}
        opacity={config.outlineOpacity}
        strokeWidth={config.lineWidth}
        strokeJoin="round"
      />
    </Group>
  );
};

export default AnimatedPolygon;
