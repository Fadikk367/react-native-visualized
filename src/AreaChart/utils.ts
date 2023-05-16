import { SkPath, SkPoint, Skia } from '@shopify/react-native-skia';

import type { AreaData } from './types';

export const buildAreaPath = (
  points: SkPoint[],
  yDomain: [number, number],
  mapDomainToCanvas: (point: SkPoint) => SkPoint,
): SkPath => {
  const path = Skia.Path.Make();

  const firstPoint = points[0] ?? { x: 0, y: 0 };
  const firstPointCanvas = mapDomainToCanvas({
    x: firstPoint.x,
    y: yDomain[0],
  });
  path.moveTo(firstPointCanvas.x, firstPointCanvas.y);

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (!point) continue;
    const scaledPoint = mapDomainToCanvas(point);
    path.lineTo(scaledPoint.x, scaledPoint.y);
  }

  const lastPoint = points[points.length - 1] ?? { x: 0, y: 0 };
  const lastPointCanvas = mapDomainToCanvas({
    x: lastPoint.x,
    y: yDomain[0],
  });
  path.lineTo(lastPointCanvas.x, lastPointCanvas.y);

  return path;
};

export const stackAreasData = (data: AreaData[]): AreaData[] => {
  return data.map((areaData, i) => {
    const stackedPoints = areaData.points.map((point, j) => {
      let totalValuesLeft = 0;
      for (let k = 0; k < i; k++) {
        totalValuesLeft += data[k]?.points[j]?.y || 0;
      }

      return {
        ...point,
        y: point.y + totalValuesLeft,
      };
    });

    return {
      ...areaData,
      points: stackedPoints,
    };
  });
};

export const normalizeAreasData = (
  data: AreaData[],
  yDomain: [number, number],
): AreaData[] => {
  const domainSize = Math.abs(yDomain[1] - yDomain[0]);

  return data.map(areaData => {
    const normalizedPoints = areaData.points.map((point, i) => {
      const totalValue = data.reduce(
        (acc, curr) => acc + curr.points[i]?.y || 0,
        0,
      );

      return {
        ...point,
        y: (point.y / totalValue) * domainSize,
      };
    });

    return {
      ...areaData,
      points: normalizedPoints,
    };
  });
};
