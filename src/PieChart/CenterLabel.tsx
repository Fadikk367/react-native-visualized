import React from 'react';

import { Text, useFont } from '@shopify/react-native-skia';

import Translate from '../core/Translate/Translate';
import type { CenterLabelProps } from './types';

const CenterLabel = ({
  annotation = { text: '', fontSize: 0 },
  label,
  gap = 0,
  center,
  font: fontSource,
}: CenterLabelProps) => {
  const annotationFont = useFont(fontSource, annotation.fontSize);
  const labelFont = useFont(fontSource, label.fontSize);

  if (!annotationFont || !labelFont) return null;

  const annotationWidth = annotationFont.getTextWidth(annotation.text);
  const labelWidth = labelFont.getTextWidth(label.text);

  return (
    <Translate x={center.x} y={center.y}>
      <Text
        text={annotation.text}
        font={annotationFont}
        x={-annotationWidth / 2}
        y={-annotation.fontSize / 3 - gap / 2}
      />
      <Text
        text={label.text}
        font={labelFont}
        x={-labelWidth / 2}
        y={
          label.fontSize / 3 +
          (annotation.text.length ? gap / 2 + annotation.fontSize / 3 : 0)
        }
      />
    </Translate>
  );
};

export default CenterLabel;
