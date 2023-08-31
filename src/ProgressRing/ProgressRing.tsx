import React from 'react';

import { Group } from '@shopify/react-native-skia';

import { getPieChartLayout } from '../PieChart/utils';
import Legend from '../core/Legend';
import { defaultLegendConfig } from '../core/Legend/constants';
import Translate from '../core/Translate/Translate';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import withPadding from '../core/withPadding';
import CenterLabel from './CenterLabel';
import Ring from './Ring';
import type { ProgressRingProps } from './types';

const ProgressRing = ({
  width,
  height,
  data,
  ringsSpacing = 6,
  startAngle = 0,
  ringWidth = 20,
  legend: customLegendConfig,
  centerLabel,
  font,
}: ProgressRingProps) => {
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);

  const {
    pie: { boundingSquare, position, center },
    legend,
  } = getPieChartLayout({
    width,
    height,
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
    <>
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
    </>
  );
};

export default withPadding(ProgressRing);
