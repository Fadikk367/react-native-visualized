import React from 'react';

import { useFont } from '@shopify/react-native-skia';

import Translate from '../Translate/Translate';
import { applyPadding, ensureDefaults } from '../utils';
import LegendItem from './LegendItem';
import { defaultMarkerConfig } from './constants';
import type { LegendProps } from './types';
import {
  getDefaultLayoutForOrientation,
  getLegendItemLayout,
  getOrientation,
} from './utils';

const Legend = ({
  items = [],
  width,
  height,
  position = 'right',
  marker,
  layout: gridLayout,
  padding: customPadding,
  font: fontSource,
  fontSize = 12,
  fontColor = 'black',
}: LegendProps) => {
  const font = useFont(fontSource, fontSize);
  const layout = applyPadding(width, height, customPadding || {});
  const markerConfig = ensureDefaults(marker, defaultMarkerConfig);
  const orientation = getOrientation(position);
  const { rows, columns } =
    gridLayout || getDefaultLayoutForOrientation(items.length, orientation);

  const getItemLayoutByIndex = getLegendItemLayout({
    width: layout.width,
    height: layout.height,
    itemsCount: items.length,
    orientation,
    rows,
    columns,
  });

  const itemsElements = items.map(({ color, label }, i) => (
    <LegendItem
      key={label}
      {...getItemLayoutByIndex(i)}
      color={color}
      marker={markerConfig}
      label={label}
      font={font}
      fontSize={fontSize}
      fontColor={fontColor}
    />
  ));

  return (
    <Translate x={layout.x} y={layout.y}>
      {itemsElements}
    </Translate>
  );
};

export default Legend;
