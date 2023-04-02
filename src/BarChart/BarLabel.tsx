import React from 'react';

import { Text, useFont } from '@shopify/react-native-skia';

import type { BarLabelProps } from './types';

const BarLabel = ({
  label,
  space,
  height,
  font: fontSource,
  fontSize = 20,
}: BarLabelProps) => {
  const font = useFont(fontSource, fontSize);

  if (!font) return null;

  const textWidth = font?.getTextWidth(label);
  const paddingX = (space - textWidth) / 2;

  return (
    <Text font={font} text={label} x={paddingX} y={height - fontSize / 3} />
  );
};

export default BarLabel;
