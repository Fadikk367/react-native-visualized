import React from 'react';

import { Group, Line } from '@shopify/react-native-skia';

import type { GridlinesProps } from './types';

const Gridlines = ({
  vertical = false,
  horizontal = false,
  xTicks = [],
  yTicks = [],
  xDomain,
  yDomain,
  lineWidth = 0,
  opacity = 0.4,
  color = 'black',
  mapDomainToCanvas,
}: GridlinesProps) => {
  const horizontalLines = horizontal
    ? yTicks.map(tick => {
        return (
          <Line
            p1={mapDomainToCanvas({ x: xDomain[0], y: tick })}
            p2={mapDomainToCanvas({ x: xDomain[1], y: tick })}
            strokeWidth={lineWidth}
            opacity={opacity}
            color={color}
          />
        );
      })
    : [];

  const verticalLines = vertical
    ? xTicks.map(tick => {
        return (
          <Line
            p1={mapDomainToCanvas({ x: tick, y: yDomain[0] })}
            p2={mapDomainToCanvas({ x: tick, y: yDomain[1] })}
            strokeWidth={lineWidth}
            opacity={opacity}
            color={color}
          />
        );
      })
    : [];

  return (
    <Group>
      {horizontalLines}
      {verticalLines}
    </Group>
  );
};

export default Gridlines;
