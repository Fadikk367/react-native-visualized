import { SkPath, SkPoint, Skia } from '@shopify/react-native-skia';

export const buildPolygonPath = <T extends string>(
  values: Record<T, number>,
  center: SkPoint,
  variables: T[],
  variableAngles: Record<T, number>,
  mapValueToDomain: (v: number) => number,
): SkPath => {
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

  return path;
};
