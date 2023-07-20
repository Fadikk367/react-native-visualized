import React from 'react';

import { Group, Text } from '@shopify/react-native-skia';

import type { LabelProps } from './types';

const RadialLabel = ({
  variable,
  angle,
  center,
  radius,
  gap = 10,
  font,
  fontSize,
}: LabelProps) => {
  return (
    <Group key={variable} transform={[{ rotate: angle }]} origin={center}>
      <Group
        origin={{ x: center.x + radius, y: center.y }}
        transform={[
          { rotate: Math.PI / 2 },
          { translateX: center.x + radius },
          { translateY: center.y },
        ]}>
        <Text
          x={-font.getTextWidth(variable) / 2}
          y={-(fontSize / 3 + gap)}
          font={font}
          text={variable}
        />
      </Group>
    </Group>
  );
};

export default RadialLabel;
