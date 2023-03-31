import React from 'react';

import { Group, Line } from '@shopify/react-native-skia';

import type { LabelsLinesProps } from './types';

const LabelsLines = ({
  labels,
  width,
  height,
  color = 'black',
  strokeWidth = 0,
  mapDomainToCanvas,
}: LabelsLinesProps) => {
  const lines = labels.map(label => (
    <Line
      p1={{ x: 0, y: height - mapDomainToCanvas(label) }}
      p2={{ x: width, y: height - mapDomainToCanvas(label) }}
      strokeWidth={strokeWidth}
      color={color}
      opacity={0.4}
    />
  ));
  return <Group>{lines}</Group>;
};

export default LabelsLines;
