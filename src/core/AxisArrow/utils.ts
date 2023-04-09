import { Skia } from '@shopify/react-native-skia';

import type { ArrowVariant } from './types';

export const getArrowPathByVariant = (
  variant: ArrowVariant,
  length: number,
  width: number,
) => {
  switch (variant) {
    case 'classic':
      return getClassicPath(length, width);
    case 'diamond':
      return getDiamondPath(length, width);
  }
};

function getClassicPath(length: number, width: number) {
  const path = Skia.Path.Make();
  path.moveTo(0, width / 2);
  path.lineTo(length, 0);
  path.lineTo(0, -width / 2);
  path.close();

  return path;
}

function getDiamondPath(length: number, width: number) {
  const path = Skia.Path.Make();
  path.moveTo(0, 0);
  path.lineTo(length / 2, width / 2);
  path.lineTo(length, 0);
  path.lineTo(length / 2, -width / 2);
  path.close();

  return path;
}
