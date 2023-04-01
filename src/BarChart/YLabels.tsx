import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import RobotoMono from '../../assets/fonts/RobotoMono.ttf';
import type { YLabelsProps } from './types';
import { getIsWithinDomain } from './utils';

const YLabels = ({
  labels,
  fontSize = 18,
  width = 30,
  height,
  domain,
  showDash = true,
  mapDomainToCanvas,
}: YLabelsProps) => {
  const font = useFont(RobotoMono, fontSize);

  const labelsWithinDomain = labels.filter(getIsWithinDomain(domain));

  const labelsElements = labelsWithinDomain
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
              y={height - mapDomainToCanvas(value) + fontSize / 3}
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
        p1={{ x: width - 1, y: height - mapDomainToCanvas(domain[1]) }}
        p2={{ x: width - 1, y: height - mapDomainToCanvas(domain[0]) }}
      />
      {labelsElements}
    </Group>
  );
};

export default YLabels;
