import React from 'react';

import { Path, Skia } from '@shopify/react-native-skia';

import Legend from '../PieChart/Legend';
import { defaultLegendConfig } from '../PieChart/Legend/constants';
import { getPieChartLayout } from '../PieChart/utils';
import ChartContainer from '../core/ChartContainer';
import Translate from '../core/Translate/Translate';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
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

  const rings = data.map(({ value, full, color, start }, index) => {
    const path = Skia.Path.Make();
    const backgroundPath = Skia.Path.Make();

    const sweepAngle = Math.min(value / full, 1) * 360;
    const ringStartAngle = Math.min((start || 0) / full, 1) * 360;
    const diameterDecrease = index * (2 * ringWidth + ringsSpacing);
    const ringRadius = (boundingSquare.width - diameterDecrease) / 2;

    path.addArc(
      {
        x: boundingSquare.x + diameterDecrease / 2,
        y: boundingSquare.y + diameterDecrease / 2,
        width: ringRadius * 2,
        height: ringRadius * 2,
      },
      startAngle - 90 + ringStartAngle,
      sweepAngle,
    );

    backgroundPath.addCircle(center.x, center.y, ringRadius);

    return (
      <>
        <Path
          path={backgroundPath}
          style="stroke"
          color={color}
          opacity={0.3}
          strokeWidth={ringWidth}
          strokeCap="round"
        />
        <Path
          path={path}
          style="stroke"
          color={color}
          strokeWidth={ringWidth}
          strokeCap="round"
        />
      </>
    );
  });

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Translate x={position.x} y={position.y}>
        {rings}
      </Translate>
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
