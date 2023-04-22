import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import Translate from '../core/Translate/';
import { defaultPadding } from '../core/constants';
import { ensureDefaults } from '../core/utils';
import Legend from './Legend';
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
  backgroundColor,
}: PieChartProps) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const legendWidth = 80;
  const legendPosition: 'left' | 'right' = 'right';
  const gapBetweenPieAndLegend = 20;

  const { pie, legend } = calculatePieChartLayout({
    width,
    height,
    padding,
    gap: gapBetweenPieAndLegend,
    legendWidth,
    legendPosition,
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
            color="white"
          />
        ) : null}
        {spacing > 0 ? (
          <SliceSpaces
            angles={startAngles}
            spacing={spacing}
            center={pie.center}
            radius={pie.radius}
          />
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
          width={legendWidth}
          font={font}
          fontSize={12}
        />
      </Translate>
    </ChartContainer>
  );
};

export default PieChart;
