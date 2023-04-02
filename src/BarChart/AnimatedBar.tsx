import React, { useEffect, useRef } from 'react';

import {
  RoundedRect,
  useComputedValue,
  useTiming,
} from '@shopify/react-native-skia';

import type { BarProps } from './types';

const AnimatedBar = ({
  value,
  space,
  ratio,
  base,
  color = 'blue',
  radius = 5,
  mapDomainToCanvas,
}: BarProps) => {
  const padding = (space - space * ratio) / 2;
  const prevValueRef = useRef(value);
  const progress = useTiming(
    { from: prevValueRef.current, to: value },
    { duration: 300 },
  );

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const barTransform = useComputedValue(
    () =>
      Math.max(
        mapDomainToCanvas(progress.current) - mapDomainToCanvas(base),
        0,
      ),
    [progress, mapDomainToCanvas],
  );

  return (
    <RoundedRect
      x={padding}
      y={mapDomainToCanvas(base)}
      width={space * ratio}
      height={barTransform}
      r={radius}
      color={color}
    />
  );
};

export default AnimatedBar;
