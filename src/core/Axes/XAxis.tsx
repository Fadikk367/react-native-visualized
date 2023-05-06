import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../AxisArrow';
import { degreesToRadians, ensureDefaults } from '../utils';
import {
  defaultFormatLabel,
  defaultLabelStyles,
  defaultLineStyles,
  defaultTickStyles,
} from './constants';
import type { AxisProps } from './types';

const XAxis = ({
  ticks,
  width,
  height,
  font: fontSource,
  arrow,
  showLine = true,
  showTicks = true,
  style = {},
  formatLabel = defaultFormatLabel,
  mapDomainToCanvas,
}: AxisProps) => {
  const lineStyles = ensureDefaults(style.line, defaultLineStyles);
  const tickStyles = ensureDefaults(style.ticks, defaultTickStyles);
  const labelStyles = ensureDefaults(style.labels, defaultLabelStyles);
  const font = useFont(fontSource, labelStyles.fontSize);

  const tickElements = ticks.map(tick => {
    if (!font) return null;

    const xOffset = mapDomainToCanvas({ x: tick, y: 0 }).x;
    const formattedLabel = formatLabel(tick);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={tick} transform={[{ translateX: xOffset }]}>
        {showTicks ? (
          <Line
            p1={{ x: 0, y: -(tickStyles.size + lineStyles.strokeWidth / 2) }}
            p2={{ x: 0, y: tickStyles.size + lineStyles.strokeWidth / 2 }}
            strokeWidth={tickStyles.width}
            color={tickStyles.color}
            strokeJoin="round"
          />
        ) : null}
        <Group
          origin={{ x: 0, y: height / 2 }}
          transform={[{ rotate: degreesToRadians(labelStyles.rotation) }]}>
          <Text
            x={-labelTextWidth / 2}
            y={height / 2 + font.getSize() / 2}
            text={formattedLabel}
            color={labelStyles.color}
            font={font}
          />
        </Group>
      </Group>
    );
  });

  return (
    <Group>
      {showLine && (
        <Line
          p1={{ x: 0, y: 0 }}
          p2={{ x: width, y: 0 }}
          strokeWidth={lineStyles.strokeWidth}
          color={lineStyles.color}
        />
      )}
      {showLine && arrow && (
        <AxisArrow
          direction="right"
          variant={arrow.variant}
          anchor={{ x: width, y: 0 }}
          length={arrow.length}
          width={arrow.width}
        />
      )}
      {tickElements}
    </Group>
  );
};

export default XAxis;
