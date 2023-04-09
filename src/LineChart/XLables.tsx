import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../core/AxisArrow';
import type { XLabels } from './types';

const XLables = ({
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

    const xOffset = mapDomainToCanvas({ x: label, y: 0 }).x;
    const formattedLabel = label.toFixed(0);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={label} transform={[{ translateX: xOffset }]}>
        <Line
          p1={{ x: 0, y: -(dashSize + baseLineWidth / 2) }}
          p2={{ x: 0, y: dashSize + baseLineWidth / 2 }}
          strokeWidth={1}
        />
        <Text
          x={-labelTextWidth / 2}
          y={height / 2 + font.getSize() / 2}
          text={label.toFixed(0)}
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
      {labelsElements}
      <AxisArrow direction="right" anchor={{ x: width, y: 0 }} length={16} />
    </Group>
  );
};

export default XLables;
