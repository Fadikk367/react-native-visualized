import React from 'react';

import { Circle } from '@shopify/react-native-skia';

import Legend from '../core/Legend';
import { defaultLegendConfig } from '../core/Legend/constants';
import Translate from '../core/Translate/';
import { ensureDefaults } from '../core/utils';
import withPadding from '../core/withPadding';
import CenterLabel from './CenterLabel';
import PieSlice from './PieSlice';
import SliceLabels from './SliceLabels';
import SliceSpaces from './SliceSpaces';
import type { PieChartProps } from './types';
import { getDataWithAngles, getPieChartLayout } from './utils';

const PieChart = ({
  width,
  height,
  data,
  startAngle: customStartAngle = 0,
  cutoutRadius = 0,
  spacing = 0,
  font,
  fontSize,
  backgroundColor = 'white',
  legend: customLegendConfig,
  centerLabel,
}: PieChartProps) => {
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);

  const { pie, legend } = getPieChartLayout({
    width,
    height,
    legend: legendConfig,
  });

  const total = data.reduce((acc, current) => acc + current.value, 0);

  const dataWithAngles = getDataWithAngles(data, total, customStartAngle);

  const startAngles = dataWithAngles.map(({ startAngle }) => startAngle);

  const labelsRadius = cutoutRadius
    ? cutoutRadius + (pie.radius - cutoutRadius) / 2
    : 0.67 * pie.radius;

  const slices = dataWithAngles.map(slice => (
    <PieSlice
      key={slice.label}
      {...slice}
      boundingSquare={pie.boundingSquare}
      center={pie.center}
    />
  ));

  return (
    <>
      <Translate x={pie.position.x} y={pie.position.y}>
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
          radius={labelsRadius}
          font={font}
          fontSize={fontSize}
        />
      </Translate>
      <Translate x={legend.position.x} y={legend.position.y}>
        <Legend
          {...legendConfig}
          items={data}
          marker={customLegendConfig?.marker}
          font={font}
        />
      </Translate>
    </>
  );
};

export default withPadding(PieChart) as (
  props: PieChartProps,
) => React.ReactElement;
