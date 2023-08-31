import type { GetLegendItemLayout, LegendPosition, Orientation } from './types';

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
    };
  };

  const verticalLayoutGetter = (index: number) => {
    const itemSize = height / itemsCount;
    return {
      x: 0,
      y: index * itemSize,
      height: itemSize,
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
