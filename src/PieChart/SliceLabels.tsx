import React from 'react';

import { Group, Text, useFont } from '@shopify/react-native-skia';

import Translate from '../core/Translate';
import { degreesToRadians } from '../core/utils';
import type { SliceLabelsProps } from './types';

const SliceLabels = ({
  data,
  total,
  center,
  radius,
  font: fontSource,
  fontSize = 16,
}: SliceLabelsProps) => {
  const font = useFont(fontSource, fontSize);
  const fontColor = 'black';
  const precision = 1;

  if (!font) return null;

  const labels = data.map(({ label, startAngle, sweepAngle, value }) => {
    const sliceCenterAngle = startAngle + sweepAngle / 2;
    const x = Math.cos(degreesToRadians(sliceCenterAngle)) * radius + center.x;
    const y = Math.sin(degreesToRadians(sliceCenterAngle)) * radius + center.y;
    const percent = (value / total) * 100;
    const percentText = `${percent.toFixed(precision)}%`;
    const textWidth = font.getTextWidth(percentText);

    return (
      <Translate key={label} x={x} y={y}>
        <Text
          x={-textWidth / 2}
          y={fontSize / 3}
          text={percentText}
          font={font}
          color={fontColor}
        />
      </Translate>
    );
  });

  return <Group>{labels}</Group>;
};

export default SliceLabels;
