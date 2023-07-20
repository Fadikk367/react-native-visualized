import React from 'react';

import { Group, Line, Text } from '@shopify/react-native-skia';

import { degreesToRadians } from '../core/utils';
import type { TicksLabelsProps } from './types';

const TickLabels = ({
  ticks,
  font,
  fontSize,
  center,
  mapValueToDomain,
}: TicksLabelsProps) => {
  if (!font) return null;

  const tickLabels = ticks.map(tick => {
    const scaledValue = mapValueToDomain(tick);
    const labelsAngle = degreesToRadians(-90);
    const tickLabelPosition = {
      x: Math.cos(labelsAngle) * scaledValue + center.x,
      y: Math.sin(labelsAngle) * scaledValue + center.y,
    };

    return (
      <Group key={tick}>
        <Line
          p1={{ x: tickLabelPosition.x - 3, y: tickLabelPosition.y }}
          p2={{ x: tickLabelPosition.x + 3, y: tickLabelPosition.y }}
          strokeWidth={1}
        />
        <Text
          x={tickLabelPosition.x + 5}
          y={tickLabelPosition.y + fontSize / 3}
          text={tick.toString()}
          font={font}
        />
      </Group>
    );
  });

  return <>{tickLabels}</>;
};

export default TickLabels;
