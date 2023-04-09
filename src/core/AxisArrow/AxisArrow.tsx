import React from 'react';

import { Group, Path } from '@shopify/react-native-skia';

import { directionToRotation } from './constants';
import type { AxisArrowProps } from './types';
import { getArrowPathByVariant } from './utils';

const AxisArrow = ({
  anchor,
  length = 16,
  width = 10,
  direction = 'down',
  variant = 'classic',
}: AxisArrowProps) => {
  const path = getArrowPathByVariant(variant, length, width);

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
