import React from 'react';

import { Group, Path, Skia } from '@shopify/react-native-skia';

import type { AxisArrowProps } from './types';

const directionToRotation = {
  left: Math.PI,
  right: 0,
  up: -Math.PI / 2,
  down: Math.PI / 2,
};

const AxisArrow = ({
  anchor,
  length = 16,
  width = 10,
  direction = 'down',
}: AxisArrowProps) => {
  const path = Skia.Path.Make();
  path.moveTo(0, width / 2);
  path.lineTo(length, 0);
  path.lineTo(0, -width / 2);
  path.close();

  return (
    <Group
      transform={[
        { translateX: anchor.x },
        { translateY: anchor.y },
        { rotate: directionToRotation[direction] },
      ]}>
      <Path path={path} />
    </Group>
  );
};

export default AxisArrow;
