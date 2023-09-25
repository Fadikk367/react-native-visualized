import React, { useEffect, useMemo } from 'react';

import {
  Path,
  SkPath,
  Skia,
  runTiming,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import type { LineProps } from './types';
import { buildPath } from './utils';

export const AnimatedLine = ({
  data: { points, color, strokeWidth },
  mapDomainToCanvas,
}: LineProps) => {
  const linePath = useMemo(
    () => buildPath(points, mapDomainToCanvas),
    [points, mapDomainToCanvas],
  );

  const state = useValue<{
    current: SkPath;
    next: SkPath;
  }>({
    current: linePath,
    next: linePath,
  });

  const transition = useValue(0);

  useEffect(() => {
    state.current = {
      current: state.current.next,
      next: linePath,
    };
    transition.current = 0;
    runTiming(transition, { from: 0, to: 1 }, { duration: 300 });
  }, [state, transition, linePath]);

  const interpolatedLine = useComputedValue(() => {
    const start = state.current.current;
    const end = state.current.next;

    if (!start && !!end) return end;

    if (!start || !end) return Skia.Path.Make();

    return end.interpolate(start, transition.current) ?? end;
  }, [state, transition]);

  return (
    <Path
      path={interpolatedLine}
      color={color}
      strokeWidth={strokeWidth}
      style="stroke"
      strokeCap="round"
      strokeJoin="round"
    />
  );
};

export default AnimatedLine;
