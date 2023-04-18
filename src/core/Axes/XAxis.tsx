import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../AxisArrow';
import type { AxisProps } from './types';

const XAxis = ({
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

  const tickElements = ticks.map(tick => {
    if (!font) return null;

    const xOffset = mapDomainToCanvas({ x: tick, y: 0 }).x;
    const formattedLabel = tick.toFixed(0);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={tick} transform={[{ translateX: xOffset }]}>
        <Line
          p1={{ x: 0, y: -(dashSize + baseLineWidth / 2) }}
          p2={{ x: 0, y: dashSize + baseLineWidth / 2 }}
          strokeWidth={1}
        />
        <Text
          x={-labelTextWidth / 2}
          y={height / 2 + font.getSize() / 2}
          text={tick.toFixed(0)}
          font={font!}
        />
      </Group>
    );
  });

  return (
    <Group>
      <Line
        p1={{ x: 0, y: 0 }}
        p2={{ x: width, y: 0 }}
        strokeWidth={baseLineWidth}
      />
      {tickElements}
      {arrows && (
        <AxisArrow
          direction="right"
          variant={arrows.variant}
          anchor={{ x: width, y: 0 }}
          length={arrows.length}
          width={arrows.width}
        />
      )}
    </Group>
  );
};

export default XAxis;
