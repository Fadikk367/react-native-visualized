import type {
  Dimensions,
  GetLegendItemLayout,
  LegendPosition,
  Orientation,
} from './types';

export const getLegendItemLayout: GetLegendItemLayout = ({
  width,
  height,
  itemsCount,
  orientation,
}) => {
  const horizontalLayoutGetter = (index: number) => {
    const itemSize = width / itemsCount;
    return {
      x: index * itemSize,
      y: 0,
      height,
      width: itemSize,
    };
  };

  const verticalLayoutGetter = (index: number) => {
    const itemSize = height / itemsCount;
    return {
      x: 0,
      y: index * itemSize,
      height: itemSize,
      width,
    };
  };

  return {
    vertical: verticalLayoutGetter,
    horizontal: horizontalLayoutGetter,
  }[orientation];
};

export const getOrientation = (position: LegendPosition): Orientation => {
  if (position === 'left' || position === 'right') return 'vertical';
  return 'horizontal';
};

export const getMarkerDimensions = (
  rectangular: Dimensions | { size: number },
): Dimensions => {
  return 'size' in rectangular
    ? { height: rectangular.size, width: rectangular.size }
    : rectangular;
};
