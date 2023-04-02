import React from 'react';

import { Circle, Group, RoundedRect } from '@shopify/react-native-skia';

// TODO: Enable importing types from library
export interface BarProps {
  value: number;
  space: number;
  ratio: number;
  padding: number;
  base: number;
  mapDomainToCanvas(v: number): number;
}
const CustomBar = ({ value, space, base, mapDomainToCanvas }: BarProps) => {
  const barHeight = mapDomainToCanvas(value) - mapDomainToCanvas(base);
  const bigCircleRadius = 12;
  const smallCircleRadius = 6;
  const barWidth = 18;

  return (
    <Group>
      <RoundedRect
        x={(space - barWidth) / 2}
        y={mapDomainToCanvas(base)}
        height={barHeight}
        width={barWidth}
        r={10}
        color="gray"
        opacity={0.7}
      />
      <Circle
        cx={space / 2}
        cy={bigCircleRadius + mapDomainToCanvas(base)}
        r={bigCircleRadius}
        color="blue"
      />
      <Circle
        cx={space / 2}
        cy={barHeight / 2 + mapDomainToCanvas(base)}
        r={smallCircleRadius}
        color="gray"
      />
      <Circle
        cx={space / 2}
        cy={Math.max(
          barHeight - bigCircleRadius + mapDomainToCanvas(base),
          bigCircleRadius,
        )}
        r={bigCircleRadius}
        color="red"
      />
    </Group>
  );
};

export default CustomBar;
