import React, { useEffect, useMemo } from 'react';

import { Group, Path, SkPath, Skia } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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

  const state = useSharedValue<{
    current: [SkPath, SkPath | null];
    next: [SkPath, SkPath | null];
  }>({
    current: [areaPath, linePath],
    next: [areaPath, linePath],
  });

  const transition = useSharedValue(0);

  useEffect(() => {
    state.value = {
      current: state.value.next,
      next: [areaPath, linePath],
    };
    transition.value = 0;
    transition.value = withTiming(1, { duration: 300 });
  }, [state, transition, areaPath, linePath]);

  const interpolatedArea = useDerivedValue(() => {
    const [start] = state.value.current;
    const [end] = state.value.next;

    return end.interpolate(start, transition.value) ?? end;
  }, [state, transition]);

  const interpolatedLine = useDerivedValue(() => {
    const [, start] = state.value.current;
    const [, end] = state.value.next;

    if (!start && !!end) return end;

    if (!start || !end) return Skia.Path.Make();

    return end.interpolate(start, transition.value) ?? end;
  }, [state, transition]);

  return (
    <Group key={`${label}/${stacked}/${normalized}`}>
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
    </Group>
  );
};

export default AnimatedArea;
