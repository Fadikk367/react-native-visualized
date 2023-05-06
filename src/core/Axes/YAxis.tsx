import React from 'react';

import { Group, Line, Text, useFont } from '@shopify/react-native-skia';

import AxisArrow from '../AxisArrow';
import { ensureDefaults } from '../utils';
import {
  defaultFormatLabel,
  defaultLabelStyles,
  defaultLineStyles,
  defaultTickStyles,
} from './constants';
import type { AxisProps } from './types';

const YAxis = ({
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

  const ticksElements = ticks.map(tick => {
    if (!font) return null;

    const yOffset = mapDomainToCanvas({ x: 0, y: tick }).y;
    const formattedLabel = formatLabel(tick);
    const labelTextWidth = font.getTextWidth(formattedLabel);

    return (
      <Group key={tick} transform={[{ translateY: yOffset }]}>
        {showTicks && (
          <Line
            p1={{
              x: width - (tickStyles.size + lineStyles.strokeWidth / 2),
              y: 0,
            }}
            p2={{
              x: width + tickStyles.size + lineStyles.strokeWidth / 2,
              y: 0,
            }}
            strokeWidth={tickStyles.width}
            color={tickStyles.color}
          />
        )}
        <Text
          x={width - labelTextWidth - 10}
          y={font.getSize() / 3}
          text={formattedLabel}
          color={labelStyles.color}
          font={font!}
        />
      </Group>
    );
  });

  return (
    <Group>
      {showLine && (
        <Line
          p1={{ x: width, y: 0 }}
          p2={{ x: width, y: height }}
          strokeWidth={lineStyles.strokeWidth}
          color={lineStyles.color}
        />
      )}
      {showLine && arrow && (
        <AxisArrow
          direction="up"
          variant={arrow.variant}
          anchor={{ x: width, y: 0 }}
          length={arrow.length}
          width={arrow.width}
        />
      )}
      {ticksElements}
    </Group>
  );
};

export default YAxis;
