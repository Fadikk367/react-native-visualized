import React from 'react';

import { Group, useFont } from '@shopify/react-native-skia';

import LegendItem from './LegendItem';
import type { LegendProps } from './types';

const Legend = ({
  items = [],
  // width,
  height,
  font: fontSource,
  fontSize = 12,
}: LegendProps) => {
  const font = useFont(fontSource, fontSize);
  const itemSize = height / items.length;

  const itemsElementsVertical = items.map(({ color, label }, i) => (
    <LegendItem
      key={label}
      y={i * itemSize}
      color={color}
      height={itemSize}
      label={label}
      font={font}
      fontSize={fontSize}
    />
  ));

  return <Group>{itemsElementsVertical}</Group>;
};

export default Legend;
