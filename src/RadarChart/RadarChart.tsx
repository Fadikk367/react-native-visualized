import React from 'react';

import { useFont } from '@shopify/react-native-skia';

import { getPieChartLayout } from '../PieChart/utils';
import Legend from '../core/Legend';
import { defaultLegendConfig } from '../core/Legend/constants';
import Translate from '../core/Translate';
import { degreesToRadians, ensureDefaults } from '../core/utils';
import withPadding from '../core/withPadding';
import AnimatedPolygon from './AnimatedPolygon';
import Axes from './Axes';
import GridLines from './GridLines';
import TickLabels from './TicksLabels';
import VariableLabels from './VariableLabels';
import { defaultPolygonsConfig } from './constants';
import type { RadarChartProps, RadarChartType } from './types';

const RadarChart = <T extends string>({
  data,
  height,
  width,
  domain,
  ticks,
  variables,
  labelsOrientation,
  labelsPadding = 40,
  font: fontSource,
  legend: customLegendConfig,
  gridLines: gridLinesConfig = {},
  axes: axesConfig = {},
  polygons: customPolygonsConfig = {},
  fontSize = 14,
}: RadarChartProps<T>) => {
  const legendConfig = ensureDefaults(customLegendConfig, defaultLegendConfig);
  const polygonsConfig = ensureDefaults(
    customPolygonsConfig,
    defaultPolygonsConfig,
  );

  const domainSize = Math.abs(domain[1] - domain[0]);
  const font = useFont(fontSource, fontSize);

  const {
    pie: { position, center, radius: totalRadius },
    legend,
  } = getPieChartLayout({
    width,
    height,
    legend: legendConfig,
  });
  const radius = totalRadius - labelsPadding;

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

  const polygons = data.map((values, i) => (
    <AnimatedPolygon
      key={i}
      values={values}
      center={center}
      variables={variables}
      variableAngles={variableAngles}
      config={polygonsConfig}
      mapValueToDomain={mapValueToDomain}
    />
  ));

  return (
    <>
      <Translate x={position.x} y={position.y}>
        {gridLinesConfig && (
          <GridLines
            variables={variables}
            variableAngles={variableAngles}
            ticks={ticks}
            center={center}
            config={gridLinesConfig}
            mapValueToDomain={mapValueToDomain}
          />
        )}
        {axesConfig && (
          <Axes
            variables={variables}
            variableAngles={variableAngles}
            center={center}
            radius={radius}
            config={axesConfig}
          />
        )}
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
    </>
  );
};

// FIXME: Find a better way to type withPadding so it does not loose generic chart type
export default withPadding(RadarChart) as RadarChartType;
