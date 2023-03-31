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
  padding,
  mapDomainToCanvas,
}: BarProps) => {
  const prevValueRef = useRef(value);
  console.log({ from: prevValueRef.current, to: value });
  const progress = useTiming(
    { from: prevValueRef.current, to: value },
    { duration: 300 },
  );

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const barTransform = useComputedValue(
    () => mapDomainToCanvas(progress.current),
    [progress],
  );

  return (
    <RoundedRect
      x={padding}
      y={0}
      width={space * ratio}
      height={barTransform}
      r={16}
      color="blue"
    />
  );
};

export default AnimatedBar;
