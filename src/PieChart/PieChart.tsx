import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import Translate from '../core/Translate/';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import CenterLabel from './CenterLabel';
import Legend from './Legend';
import { defaultLegendConfig } from './Legend/constants';
import PieSlice from './PieSlice';
import SliceLabels from './SliceLabels';
import SliceSpaces from './SliceSpaces';
import type { PieChartProps } from './types';
import { calculatePieChartLayout, calculateSlicesAngles } from './utils';

const PieChart = ({
  width,
  height,
  data,
  startAngle: customStartAngle = 0,
  cutoutRadius = 0,
  spacing = 0,
  padding: customPadding,
  font,
  fontSize,
  backgroundColor = 'white',
  legend: customLegendConfig,
  centerLabel,
}: PieChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);

  const { pie, legend } = calculatePieChartLayout({
    width,
    height,
    padding,
    legend: legendConfig,
  });

  const total = data.reduce((acc, current) => acc + current.value, 0);

  const dataWithAngles = calculateSlicesAngles(data, total, customStartAngle);

  const startAngles = dataWithAngles.map(({ startAngle }) => startAngle);

  const slices = dataWithAngles.map(slice => (
    <PieSlice
      {...slice}
      boundingSquare={pie.boundingSquare}
      center={pie.center}
    />
  ));

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Translate x={pie.position.x}>
        {slices}
        {cutoutRadius ? (
          <Circle
            cx={pie.center.x}
            cy={pie.center.y}
            r={cutoutRadius}
            color={backgroundColor}
          />
        ) : null}
        {spacing > 0 ? (
          <SliceSpaces
            angles={startAngles}
            spacing={spacing}
            center={pie.center}
            radius={pie.radius}
            color={backgroundColor}
          />
        ) : null}
        {centerLabel ? (
          <CenterLabel {...centerLabel} center={pie.center} font={font} />
        ) : null}
        <SliceLabels
          data={dataWithAngles}
          total={total}
          center={pie.center}
          radius={cutoutRadius + (pie.radius - cutoutRadius) / 2}
          font={font}
          fontSize={fontSize}
        />
      </Translate>
      <Translate x={legend.position.x}>
        <Legend
          items={data}
          height={140}
          width={legendConfig.width}
          font={font}
          fontSize={12}
        />
      </Translate>
    </ChartContainer>
  );
};

export default PieChart;
