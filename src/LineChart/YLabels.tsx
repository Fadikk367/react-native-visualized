import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from './AxisArrow';
import type { XLabels } from './types';

const YLabels = ({
  labels,
  width,
  height,
  font: fontSource,
  fontSize = 18,
  mapDomainToCanvas,
}: XLabels) => {
  const font = useFont(fontSource, fontSize);
  const dashSize = 3;
  const baseLineWidth = 1;
  const labelsElements = labels.map(label => {
    if (!font) return null;

    const yOffset = mapDomainToCanvas({ x: 0, y: label }).y;
    const formattedLabel = label.toFixed(0);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={label} transform={[{ translateY: yOffset }]}>
        <Line
          p1={{ x: width - (dashSize + baseLineWidth / 2), y: 0 }}
          p2={{ x: width + dashSize + baseLineWidth / 2, y: 0 }}
          strokeWidth={1}
        />
        <Text
          x={width - labelTextWidth - 10}
          y={font.getSize() / 3}
          text={label.toFixed(0)}
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
      {labelsElements}
      <AxisArrow direction="up" anchor={{ x: width, y: 0 }} length={16} />
    </Group>
  );
};

export default YLabels;
