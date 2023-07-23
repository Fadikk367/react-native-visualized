import React from 'react';

import { Path, Skia } from '@shopify/react-native-skia';

import { ensureDefaults } from '../core/utils';
import { gridLinesConfigDefaults } from './constants';
import type { GridLinesProps } from './types';

const GridLines = <T extends string>({
  ticks,
  variables,
  variableAngles,
  center,
  config: customConfig,
  mapValueToDomain,
}: GridLinesProps<T>) => {
  const config = ensureDefaults(customConfig, gridLinesConfigDefaults);

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
      <Path
        key={tick}
        path={path}
        style="stroke"
        color={config.color}
        opacity={config.opacity}
        strokeWidth={config.lineWidth}
      />
    );
  });

  return <>{gridLines}</>;
};

export default GridLines;
