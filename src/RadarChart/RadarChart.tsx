import React from 'react';

import { Group, Line, useFont } from '@shopify/react-native-skia';

import Legend from '../PieChart/Legend';
import { defaultLegendConfig } from '../PieChart/Legend/constants';
import { getPieChartLayout } from '../PieChart/utils';
import ChartContainer from '../core/ChartContainer';
import Translate from '../core/Translate';
import { defaultPadding } from '../core/constants';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import AnimatedPolygon from './AnimatedPolygon';
import GridLines from './GridLines';
import TickLabels from './TicksLabels';
import VariableLabels from './VariableLabels';
import type { RadarChartProps } from './types';

const RadarChart = <T extends string>({
  data,
  height,
  width,
  domain,
  ticks,
  padding: customPadding,
  variables,
  labelsOrientation,
  backgroundColor,
  font: fontSource,
  legend: customLegendConfig,
  fontSize = 14,
}: RadarChartProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);
  const domainSize = Math.abs(domain[1] - domain[0]);
  const font = useFont(fontSource, fontSize);

  const {
    pie: { position, center, radius: totalRadius },
    legend,
  } = getPieChartLayout({
    width,
    height,
    padding,
    legend: legendConfig,
  });
  const paddingForLabels = 30;
  const radius = totalRadius - paddingForLabels;

  const mapValueToDomain = (v: number): number => {
    return (v * radius) / domainSize;
  };

  const variableAngles = Object.fromEntries(
    variables.map((variable, i) => {
      const sliceAngleInDegrees = 360 / variables.length;
      const variableAngle = degreesToRadians(i * sliceAngleInDegrees - 90);
      return [variable, variableAngle];
    }),
  ) as Record<T, number>;

  const variablesAxes = variables.map(variable => {
    const variableAngle = variableAngles[variable];
    return (
      <Group
        key={variable}
        transform={[{ rotate: variableAngle }]}
        origin={center}>
        <Line
          p1={center}
          p2={{ x: center.x + radius, y: center.y }}
          strokeWidth={1}
        />
      </Group>
    );
  });

  const polygons = data.map((values, i) => (
    <AnimatedPolygon
      key={i}
      values={values}
      center={center}
      variables={variables}
      variableAngles={variableAngles}
      mapValueToDomain={mapValueToDomain}
    />
  ));

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      <Translate x={position.x} y={position.y}>
        <GridLines
          variables={variables}
          variableAngles={variableAngles}
          ticks={ticks}
          center={center}
          mapValueToDomain={mapValueToDomain}
        />
        {variablesAxes}
        {polygons}
        <TickLabels
          ticks={ticks}
          center={center}
          font={font}
          fontSize={fontSize}
          mapValueToDomain={mapValueToDomain}
        />
        <VariableLabels
          variables={variables}
          angles={variableAngles}
          center={center}
          radius={radius}
          font={font}
          fontSize={fontSize}
          orientation={labelsOrientation}
        />
      </Translate>
      <Translate x={legend.position.x} y={legend.position.y}>
        <Legend
          items={data}
          height={legendConfig.height}
          width={legendConfig.width}
          position={legendConfig.position}
          font={fontSource}
          fontSize={12}
        />
      </Translate>
    </ChartContainer>
  );
};

export default RadarChart;
