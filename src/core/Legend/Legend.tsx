import React from 'react';

import { Group, useFont } from '@shopify/react-native-skia';

import { ensureDefaults } from '../utils';
import LegendItem from './LegendItem';
import { defaultMarkerConfig } from './constants';
import type { LegendProps } from './types';
import { getLegendItemLayout, getOrientation } from './utils';

const Legend = ({
  items = [],
  width,
  height,
  position = 'right',
  marker,
  font: fontSource,
  fontSize = 12,
  textColor = 'black',
}: LegendProps) => {
  const font = useFont(fontSource, fontSize);
  const orientation = getOrientation(position);
  const markerConfig = ensureDefaults(marker, defaultMarkerConfig);

  const getItemLayoutByIndex = getLegendItemLayout({
    width,
    height,
    itemsCount: items.length,
    orientation,
  });

  const itemsElementsVertical = items.map(({ color, label }, i) => (
    <LegendItem
      key={label}
      {...getItemLayoutByIndex(i)}
      color={color}
      marker={markerConfig}
      label={label}
      font={font}
      fontSize={fontSize}
      textColor={textColor}
    />
  ));

  return <Group>{itemsElementsVertical}</Group>;
};

export default Legend;
