import type { SkRect } from '@shopify/react-native-skia';

import type { Padding } from '../types';
import { defaultPadding } from './constants';

export function ensureDefaults<T extends Record<string, number | string | any>>(
  obj: T | undefined,
  defaults: Required<T>,
): Required<T> {
  if (!obj) return { ...defaults };

  let result: Partial<T> = { ...obj };
  for (const key in defaults) {
    result[key] = obj[key] === undefined ? defaults[key] : obj[key];
  }

  return result as Required<T>;
}

export const linspace = (from: number, to: number, step: number): number[] => {
  const numberOfPoints = Math.abs(to - from) / step + 1;
  return Array.from({ length: numberOfPoints }, (_, i) => from + i * step);
};

export const getIsWithinDomain =
  (domain: [number, number]) => (value: number) => {
    return domain[0] <= value && value <= domain[1];
  };

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const applyPadding = (
  width: number,
  height: number,
  customPadding: Partial<Padding>,
): SkRect => {
  const padding = { ...defaultPadding, ...customPadding };

  return {
    x: padding.left,
    y: padding.top,
    width: width - (padding.left + padding.right),
    height: height - (padding.top + padding.bottom),
  };
};
