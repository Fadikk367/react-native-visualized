import { SkPath, SkPoint, Skia } from '@shopify/react-native-skia';

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
