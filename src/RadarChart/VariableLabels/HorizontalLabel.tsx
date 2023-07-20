import React from 'react';

import { Group, Text } from '@shopify/react-native-skia';

import type { LabelProps } from './types';

const HorizontalLabel = ({
  variable,
  angle,
  center,
  radius,
  gap = 10,
  font,
  fontSize,
}: LabelProps) => {
  const labelY = Math.sin(angle) * (radius + gap) + center.y;
  const labelX = Math.cos(angle) * (radius + gap) + center.x;
  let xOffset = 0;
  let yOffset = 0;
  if (angle % (Math.PI / 2) === 0) {
    xOffset = font.getTextWidth(variable) / 2;
    yOffset = angle === Math.PI / 2 ? -gap : gap;
  } else if (angle > Math.PI / 2) {
    xOffset = font.getTextWidth(variable);
  }

  return (
    <Group key={variable}>
      <Text
        x={labelX - xOffset}
        y={labelY + fontSize / 3 - yOffset}
        font={font}
        text={variable}
      />
    </Group>
  );
};

export default HorizontalLabel;
