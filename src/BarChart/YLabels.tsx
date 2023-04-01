import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import RobotoMono from '../../assets/fonts/RobotoMono.ttf';
import type { YLabelsProps } from './types';

const YLabels = ({
  labels,
  fontSize = 18,
  width = 30,
  height,
  base,
  showDash = true,
  mapDomainToCanvas,
}: YLabelsProps) => {
  const font = useFont(RobotoMono, fontSize);

  const labelsElements = labels
    .map(value => {
      return (
        <Group key={value}>
          {showDash && (
            <Line
              strokeWidth={1}
              strokeCap="round"
              p1={{ x: width - 1 - 3, y: height - mapDomainToCanvas(value) }}
              p2={{ x: width - 1 + 3, y: height - mapDomainToCanvas(value) }}
            />
          )}
          {font && (
            <Text
              x={width - font.getTextWidth(String(value)) - 10}
              y={270 - mapDomainToCanvas(value) + fontSize / 3}
              font={font}
              text={String(value)}
            />
          )}
        </Group>
      );
    })
    .reverse();

  return (
    <Group>
      <Line
        strokeWidth={1}
        p1={{ x: width - 1, y: 0 }}
        p2={{ x: width - 1, y: height - mapDomainToCanvas(base) }}
      />
      {labelsElements}
    </Group>
  );
};

export default YLabels;
