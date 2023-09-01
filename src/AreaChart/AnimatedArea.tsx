import React, { useEffect, useMemo } from 'react';

import {
  Path,
  SkPath,
  Skia,
  runTiming,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';

import { buildPath } from '../LineChart/utils';
import AreaFill from './AreaFill';
import type { AreaProps } from './types';
import { buildAreaPath } from './utils';

export const AnimatedArea = ({
  data: { label, points, color, fill, opacity = 1, stroke },
  yDomain,
  stacked = false,
  normalized = false,
  mapDomainToCanvas,
}: AreaProps) => {
  const [areaPath, linePath] = useMemo(
    () => [
      buildAreaPath(points, yDomain, mapDomainToCanvas),
      stroke ? buildPath(points, mapDomainToCanvas) : null,
    ],
    [points, yDomain, stroke, mapDomainToCanvas],
  );

  const state = useValue<{
    current: [SkPath, SkPath | null];
    next: [SkPath, SkPath | null];
  }>({
    current: [areaPath, linePath],
    next: [areaPath, linePath],
  });

  const transition = useValue(0);

  useEffect(() => {
    state.current = {
      current: state.current.next,
      next: [areaPath, linePath],
    };
    transition.current = 0;
    runTiming(transition, { from: 0, to: 1 }, { duration: 300 });
  }, [state, transition, areaPath, linePath]);

  const interpolatedArea = useComputedValue(() => {
    const [start] = state.current.current;
    const [end] = state.current.next;

    return end.interpolate(start, transition.current) ?? end;
  }, [state, transition]);

  const interpolatedLine = useComputedValue(() => {
    const [, start] = state.current.current;
    const [, end] = state.current.next;

    if (!start && !!end) return end;

    if (!start || !end) return Skia.Path.Make();

    return end.interpolate(start, transition.current) ?? end;
  }, [state, transition]);

  return (
    <React.Fragment key={`${label}/${stacked}/${normalized}`}>
      <Path
        path={interpolatedArea}
        color={color}
        strokeWidth={0}
        opacity={opacity}
        style="fill"
        strokeCap="round"
        strokeJoin="round">
        {fill && <AreaFill fill={fill} />}
      </Path>
      {linePath && (
        <Path
          path={interpolatedLine}
          color={color}
          strokeWidth={stroke}
          style="stroke"
          strokeCap="round"
          strokeJoin="round"
        />
      )}
    </React.Fragment>
  );
};

export default AnimatedArea;
