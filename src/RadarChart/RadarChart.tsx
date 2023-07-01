import React from 'react';

import {
  Group,
  Line,
  Path,
  Skia,
  Text,
  useFont,
} from '@shopify/react-native-skia';

import ChartContainer from '../core/ChartContainer';
import { defaultPadding } from '../core/constants';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import AnimatedPolygon from './AnimatedPolygon';
import type { RadarChartProps } from './types';

const RadarChart = <T extends string>({
  data,
  height,
  width,
  domain,
  ticks,
  padding: customPadding,
  variables,
  backgroundColor,
  font: fontSource,
  fontSize = 14,
}: RadarChartProps<T>) => {
  const padding = ensureDefaults(customPadding, defaultPadding);
  const contentWidth = width - (padding.left + padding.right);
  const contentHeight = height - (padding.top + padding.bottom);
  const center = { x: contentWidth / 2, y: contentHeight / 2 };
  const radius = Math.min(contentWidth, contentHeight) / 2 - 20;
  const domainSize = Math.abs(domain[1] - domain[0]);
  const font = useFont(fontSource, fontSize);

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
    const x = Math.cos(variableAngle) * radius + center.x;
    const y = Math.sin(variableAngle) * radius + center.y;

    return (
      <Group>
        <Line p1={center} p2={{ x, y }} strokeWidth={1} />
      </Group>
    );
  });

  const gridLines = ticks.map(tick => {
    const path = Skia.Path.Make();
    const points = variables.map(name => {
      const scaledValue = mapValueToDomain(tick);
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
      <Group key={tick}>
        <Path
          path={path}
          style="stroke"
          color="#000000"
          opacity={0.3}
          strokeWidth={1}
        />
      </Group>
    );
  });

  const tickLabels = font
    ? ticks.map(tick => {
        const scaledValue = mapValueToDomain(tick);
        const labelsAngle = degreesToRadians(-90);
        const tickLabelPosition = {
          x: Math.cos(labelsAngle) * scaledValue + center.x,
          y: Math.sin(labelsAngle) * scaledValue + center.y,
        };

        return (
          <Group key={tick}>
            <Line
              p1={{ x: tickLabelPosition.x - 3, y: tickLabelPosition.y }}
              p2={{ x: tickLabelPosition.x + 3, y: tickLabelPosition.y }}
              strokeWidth={1}
            />
            <Text
              x={tickLabelPosition.x + 5}
              y={tickLabelPosition.y + fontSize / 3}
              text={tick.toString()}
              font={font}
            />
          </Group>
        );
      })
    : [];

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
      {gridLines}
      {variablesAxes}
      {polygons}
      {tickLabels}
    </ChartContainer>
  );
};

export default RadarChart;
