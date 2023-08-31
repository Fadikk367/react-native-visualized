import React from 'react';

import { RoundedRect, Text } from '@shopify/react-native-skia';

import Translate from '../Translate';
import type { LegendItemProps } from './types';
import { getMarkerDimensions } from './utils';

const LegendItem = ({
  label,
  color,
  x = 0,
  y = 0,
  height,
  marker,
  font,
  fontSize,
  textColor,
}: LegendItemProps) => {
  const { height: markerHeight, width: markerWidth } =
    getMarkerDimensions(marker);

  return (
    <Translate key={label} x={x} y={y}>
      <RoundedRect
        x={0}
        y={(height - markerHeight) / 2}
        r={marker.radius}
        width={markerWidth}
        height={markerHeight}
        color={color}
      />
      {font && (
        <Text
          x={markerWidth + 10}
          y={height / 2 + fontSize / 3}
          text={label}
          font={font}
          color={textColor}
        />
      )}
    </Translate>
  );
};

export default LegendItem;
