import React from 'react';

import { Group, useFont } from '@shopify/react-native-skia';

import LegendItem from './LegendItem';
import type { LegendProps } from './types';
import { getLegendItemLayout, getOrientation } from './utils';

const Legend = ({
  items = [],
  width,
  height,
  position = 'right',
  font: fontSource,
  fontSize = 12,
}: LegendProps) => {
  const font = useFont(fontSource, fontSize);
  const orientation = getOrientation(position);

  const getItemLayoutByIndex = getLegendItemLayout({
    width,
    height,
    itemsCount: items.length,
    orientation,
  });

  const itemsElementsVertical = items.map(({ color, label }, i) => {
    const { x, y, height: itemHeight } = getItemLayoutByIndex(i);
    return (
      <LegendItem
        key={label}
        x={x}
        y={y}
        color={color}
        height={itemHeight}
        label={label}
        font={font}
        fontSize={fontSize}
      />
    );
  });

  return <Group>{itemsElementsVertical}</Group>;
};

export default Legend;
