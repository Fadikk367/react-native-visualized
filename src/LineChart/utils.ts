import { SkPath, SkPoint, Skia } from '@shopify/react-native-skia';

export const buildPath = (
  points: SkPoint[],
  mapDomainToCanvas: (point: SkPoint) => SkPoint,
): SkPath => {
  const path = Skia.Path.Make();

  const firstPoint = points[0] ?? { x: 0, y: 0 };
  const scaledFirstPoint = mapDomainToCanvas(firstPoint);
  path.moveTo(scaledFirstPoint.x, scaledFirstPoint.y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    if (!point) continue;
    const scaledPoint = mapDomainToCanvas(point);
    path.lineTo(scaledPoint.x, scaledPoint.y);
  }

  return path;
};
