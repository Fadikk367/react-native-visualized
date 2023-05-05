import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../AxisArrow';
import { degreesToRadians } from '../utils';
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

  // axis line
  const axisLineWidth = 2;
  const axisLineColor = 'black';

  // ticks labels
  const labelRotation = 0;
  const labelColor = 'black';
  const formatLabel = (tick: number): string => {
    return tick.toFixed(0);
  };

  // ticks
  const showTicks = true;
  const tickSize = 3;
  const tickWidth = 1;
  const tickColor = 'black';

  const tickElements = ticks.map(tick => {
    if (!font) return null;

    const xOffset = mapDomainToCanvas({ x: tick, y: 0 }).x;
    const formattedLabel = tick.toFixed(0);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={tick} transform={[{ translateX: xOffset }]}>
        {showTicks ? (
          <Line
            p1={{ x: 0, y: -(tickSize + axisLineWidth / 2) }}
            p2={{ x: 0, y: tickSize + axisLineWidth / 2 }}
            strokeWidth={tickWidth}
            color={tickColor}
            strokeJoin="round"
          />
        ) : null}
        <Group
          origin={{ x: 0, y: height / 2 }}
          transform={[{ rotate: degreesToRadians(labelRotation) }]}>
          <Text
            x={-labelTextWidth / 2}
            y={height / 2 + font.getSize() / 2}
            text={formatLabel(tick)}
            color={labelColor}
            font={font}
          />
        </Group>
      </Group>
    );
  });

  return (
    <Group>
      <Line
        p1={{ x: 0, y: 0 }}
        p2={{ x: width, y: 0 }}
        strokeWidth={axisLineWidth}
        color={axisLineColor}
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
