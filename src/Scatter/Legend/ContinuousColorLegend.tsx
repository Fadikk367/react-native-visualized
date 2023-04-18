import React from 'react';

import {
  Group,
  Line,
  LinearGradient,
  RoundedRect,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';

import Translate from '../../core/Translate/Translate';
import type { ContinuousColorLegendProps } from './types';

const ContinuousColorLegend = ({
  // width,
  height,
  colors,
  domain,
  ticks,
  font: fontSource,
  fontSize = 12,
}: ContinuousColorLegendProps) => {
  const font = useFont(fontSource, fontSize);
  const domainSize = Math.abs(domain[1] - domain[0]);
  const gradientWith = 18;
  const gradientLeftPadding = 10;

  const mapDomainToCanvas = (value: number): number => {
    return height - (height / domainSize) * (value - domain[0]);
  };

  const labels = ticks.map(tick => (
    <Translate
      key={tick}
      x={gradientLeftPadding + gradientWith}
      y={mapDomainToCanvas(tick)}>
      <Line p1={{ x: 0, y: 0 }} p2={{ x: 5, y: 0 }} strokeWidth={1} />
      {font && (
        <Text x={7} y={fontSize / 3} text={tick.toString()} font={font} />
      )}
    </Translate>
  ));

  return (
    <Group>
      <RoundedRect
        x={gradientLeftPadding}
        y={0}
        width={gradientWith}
        height={height}
        r={3}>
        <LinearGradient
          colors={[...colors].reverse()}
          start={vec(0, 0)}
          end={vec(0, height)}
        />
      </RoundedRect>
      {labels}
    </Group>
  );
};

export default ContinuousColorLegend;
