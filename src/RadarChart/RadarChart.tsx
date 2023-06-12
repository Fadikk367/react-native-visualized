import React from 'react';

import { Group, Line, Path, Skia } from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import type { RadarChartProps } from './types';

const RadarChart = <T extends string>({
  data,
  height,
  width,
  domain,
  padding: customPadding,
  variables,
  backgroundColor,
}: RadarChartProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const contentWidth = width - (padding.left + padding.right);
  const contentHeight = height - (padding.top + padding.bottom);
  const center = { x: contentWidth / 2, y: contentHeight / 2 };
  const radius = Math.min(contentWidth, contentHeight) / 2 - 20;
  const domainSize = Math.abs(domain[1] - domain[0]);

  const mapValueToDomain = (v: number): number => {
    return (v * radius) / domainSize;
  };

  const variableAngles = Object.fromEntries(
    variables.map((variable, i) => {
      const sliceAngleInDegrees = 360 / variables.length;
      const variableAngle = degreesToRadians(i * sliceAngleInDegrees);
      return [variable, variableAngle];
    }),
  ) as Record<T, number>;

  const variablesAxes = variables.map(variable => {
    const variableAngle = variableAngles[variable];
    const x = Math.cos(variableAngle) * radius + center.x;
    const y = Math.sin(variableAngle) * radius + center.y;

    return (
      <Group>
        <Line p1={center} p2={{ x, y }} strokeWidth={1} />
      </Group>
    );
  });

  const polygons = data.map((values, i) => {
    const path = Skia.Path.Make();
    const points = variables.map(name => {
      const value = values[name];
      const scaledValue = mapValueToDomain(value);
      const variableAngle = variableAngles[name];

      return {
        x: Math.cos(variableAngle) * scaledValue + center.x,
        y: Math.sin(variableAngle) * scaledValue + center.y,
      };
    });

    const firstPoint = points[0] || { x: 0, y: 0 };
    path.moveTo(firstPoint.x, firstPoint.y);
    points.forEach(point => {
      path.lineTo(point.x, point.y);
    });
    path.close();

    return (
      <Group key={i}>
        <Path
          path={path}
          style="stroke"
          color={values.color}
          opacity={0.3}
          strokeWidth={3}
        />
      </Group>
    );
  });

  return (
    <ChartContainer
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}>
      {variablesAxes}
      {polygons}
    </ChartContainer>
  );
};

export default RadarChart;
