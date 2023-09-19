import React, { useEffect, useMemo, useRef } from 'react';

import { Path, Skia, useTiming } from '@shopify/react-native-skia';

import type { RingProps } from './types';

const Ring = ({
  value,
  full,
  ringWidth,
  ringsSpacing,
  boundingSquare,
  start,
  center,
  index,
  color,
}: RingProps) => {
  const prevValue = useRef(0);
  const pathStart = Math.min((start || 0) / full, 1);
  const pathEnd = useTiming(
    { from: prevValue.current, to: value / full },
    { duration: 300 },
  );

  useEffect(() => {
    prevValue.current = value / full;
  }, [value, full]);

  const { fillPath, backgroundPath } = useMemo(() => {
    const path = Skia.Path.Make();

    const diameterDecrease = index * (2 * ringWidth + ringsSpacing);
    const ringRadius = (boundingSquare.width - diameterDecrease) / 2;

    path.addCircle(center.x, center.y, ringRadius - ringWidth / 2);

    return {
      fillPath: path,
      backgroundPath: path.copy(),
    };
  }, [boundingSquare.width, center, index, ringWidth, ringsSpacing]);

  return (
    <>
      <Path
        path={backgroundPath}
        style="stroke"
        color={color}
        opacity={0.3}
        strokeWidth={ringWidth}
        strokeCap="round"
      />
      <Path
        path={fillPath}
        start={pathStart}
        end={pathEnd}
        style="stroke"
        color={color}
        strokeWidth={ringWidth}
        strokeCap="round"
      />
    </>
  );
};

export default Ring;
