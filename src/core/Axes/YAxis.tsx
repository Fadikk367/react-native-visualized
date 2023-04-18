import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../AxisArrow';
import type { AxisProps } from './types';

const YAxis = ({
  ticks,
  width,
  height,
  font: fontSource,
  fontSize = 18,
  arrows,
  mapDomainToCanvas,
}: AxisProps) => {
  const font = useFont(fontSource, fontSize);
  const dashSize = 3;
  const baseLineWidth = 1;

  const ticksElements = ticks.map(tick => {
    if (!font) return null;

    const yOffset = mapDomainToCanvas({ x: 0, y: tick }).y;
    const formattedLabel = tick.toFixed(0);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={tick} transform={[{ translateY: yOffset }]}>
        <Line
          p1={{ x: width - (dashSize + baseLineWidth / 2), y: 0 }}
          p2={{ x: width + dashSize + baseLineWidth / 2, y: 0 }}
          strokeWidth={1}
        />
        <Text
          x={width - labelTextWidth - 10}
          y={font.getSize() / 3}
          text={tick.toFixed(0)}
          font={font!}
        />
      </Group>
    );
  });

  return (
    <Group>
      <Line
        p1={{ x: width, y: 0 }}
        p2={{ x: width, y: height }}
        strokeWidth={baseLineWidth}
      />
      {ticksElements}
      {arrows && (
        <AxisArrow
          direction="up"
          variant={arrows.variant}
          anchor={{ x: width, y: 0 }}
          length={arrows.length}
          width={arrows.width}
        />
      )}
    </Group>
  );
};

export default YAxis;
