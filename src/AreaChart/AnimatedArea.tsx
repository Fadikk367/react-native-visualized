import React, { useEffect, useMemo } from 'react';

import {
  Path,
  runTiming,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import type { AreaProps } from './types';
import { buildAreaPath } from './utils';

export const AnimatedArea = ({
  data: { id, points, color, opacity = 1 },
  yDomain,
  stacked = false,
  normalized = false,
  mapDomainToCanvas,
}: AreaProps) => {
  const path = useMemo(
    () => buildAreaPath(points, yDomain, mapDomainToCanvas),
    [points, yDomain, mapDomainToCanvas],
  );

  const state = useValue({
    current: path,
    next: path,
  });

  const transition = useValue(0);

  useEffect(() => {
    state.current = {
      current: state.current.next,
      next: path,
    };
    transition.current = 0;
    runTiming(transition, { from: 0, to: 1 }, { duration: 300 });
  }, [state, transition, path]);

  const interpolatedPath = useComputedValue(() => {
    const start = state.current.current;
    const end = state.current.next;

    const interpolated = end.interpolate(start, transition.current);
    return interpolated ?? end;
  }, [state, transition]);

  return (
    <Path
      key={`${id}/${stacked}/${normalized}`}
      path={interpolatedPath}
      color={color}
      strokeWidth={0}
      opacity={opacity}
      style="fill"
      strokeCap="round"
      strokeJoin="round"
    />
  );
};

export default AnimatedArea;
