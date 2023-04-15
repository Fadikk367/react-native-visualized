import React from 'react';

import { Circle, Group, Text, useFont } from '@shopify/react-native-skia';

import Translate from '../../core/Translate/Translate';
import type { LegendProps } from './types';

const Legend = ({
  items = [],
  width,
  height = 30,
  font: fontSource,
  fontSize = 12,
}: LegendProps) => {
  const font = useFont(fontSource, fontSize);
  const itemSize = width / items.length;

  const itemsElements = items.map(({ color, label }, i) => (
    <Translate x={i * itemSize}>
      <Circle cx={0} cy={height / 2} r={7} color={color} />
      {font && (
        <Text x={15} y={height / 2 + fontSize / 3} text={label} font={font} />
      )}
    </Translate>
  ));

  return <Group>{itemsElements}</Group>;
};

export default Legend;
