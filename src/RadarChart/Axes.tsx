import React from 'react';

import { Group, Line } from '@shopify/react-native-skia';

import { ensureDefaults } from '../core/utils';
import { axesConfigDefaults } from './constants';
import type { AxesProps } from './types';

const Axes = <T extends string>({
  variables,
  variableAngles,
  center,
  radius,
  config: customConfig,
}: AxesProps<T>) => {
  const { color, lineWidth, opacity } = ensureDefaults(
    customConfig,
    axesConfigDefaults,
  );

  const variablesAxes = variables.map(variable => {
    const variableAngle = variableAngles[variable];
    return (
      <Group
        key={variable}
        transform={[{ rotate: variableAngle }]}
        origin={center}>
        <Line
          p1={center}
          p2={{ x: center.x + radius, y: center.y }}
          strokeWidth={lineWidth}
          opacity={opacity}
          color={color}
        />
      </Group>
    );
  });

  return <>{variablesAxes}</>;
};

export default Axes;
