import React from 'react';

import { Circle, Text } from '@shopify/react-native-skia';

import Translate from '../../core/Translate';
import type { LegendItemProps } from './types';

const LegendItem = ({
  label,
  color,
  x = 0,
  y = 0,
  height,
  font,
  fontSize,
}: LegendItemProps) => {
  const circleRadius = 7;

  if (!font) return null;

  return (
    <Translate key={label} x={x} y={y}>
      <Circle
        cx={circleRadius}
        cy={height / 2}
        r={circleRadius}
        color={color}
      />
      {font && (
        <Text
          x={circleRadius + 15}
          y={height / 2 + fontSize / 3}
          text={label}
          font={font}
        />
      )}
    </Translate>
  );
};

export default LegendItem;
