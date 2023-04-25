import React from 'react';

import { Text, useFont } from '@shopify/react-native-skia';

import Translate from '../core/Translate/Translate';
import type { CenterLabelProps } from './types';

const CenterLabel = ({
  text,
  color,
  fontSize = 24,
  center,
  font: fontSource,
}: CenterLabelProps) => {
  const font = useFont(fontSource, fontSize);

  if (!font) return null;

  return (
    <Translate x={center.x} y={center.y}>
      <Text
        x={-font.getTextWidth(text) / 2}
        y={fontSize / 3}
        font={font}
        text={text}
        color={color}
      />
    </Translate>
  );
};

export default CenterLabel;
