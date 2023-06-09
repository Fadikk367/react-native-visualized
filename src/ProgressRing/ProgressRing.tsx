import React from 'react';

import { Group } from '@shopify/react-native-skia';

import Legend from '../PieChart/Legend';
import { defaultLegendConfig } from '../PieChart/Legend/constants';
import { getPieChartLayout } from '../PieChart/utils';
import ChartContainer from '../core/ChartContainer';
import Translate from '../core/Translate/Translate';
import { defaultPadding } from '../core/constants';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import CenterLabel from './CenterLabel';
import Ring from './Ring';
import type { ProgressRingProps } from './types';

const ProgressRing = ({
  width,
  height,
  padding: customPadding,
  backgroundColor,
  data,
  ringsSpacing = 6,
  startAngle = 0,
  ringWidth = 20,
  legend: customLegendConfig,
  centerLabel,
  font,
}: ProgressRingProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);

  const {
    pie: { boundingSquare, position, center },
    legend,
  } = getPieChartLayout({
    width,
    height,
    padding,
    legend: legendConfig,
  });

  const rings = data.map((ring, i) => (
    <Ring
      key={ring.label}
      {...ring}
      boundingSquare={boundingSquare}
      center={center}
      ringWidth={ringWidth}
      ringsSpacing={ringsSpacing}
      index={i}
    />
  ));

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Translate x={position.x} y={position.y}>
        <Group
          origin={center}
          // -Math.PI / 2 to shift default angle
          transform={[{ rotate: -Math.PI / 2 + degreesToRadians(startAngle) }]}>
          {rings}
        </Group>
      </Translate>
      {centerLabel && (
        <CenterLabel {...centerLabel} font={font} center={center} />
      )}
      <Translate x={legend.position.x} y={legend.position.y}>
        <Legend
          items={data}
          height={legendConfig.height}
          width={legendConfig.width}
          position={legendConfig.position}
          font={font}
          fontSize={12}
        />
      </Translate>
    </ChartContainer>
  );
};

export default ProgressRing;
